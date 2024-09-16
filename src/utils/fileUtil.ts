export class FileUtil {
  public static toBase64(
    fileList: FileList,
    index: number = 0,
  ): Promise<string> {
    if (typeof fileList !== 'object') {
      throw new Error('Value is not an object');
    }

    const file = fileList?.item(index);

    if (!file) {
      throw new Error('File not found');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  public static async convertFilesListToBase64<T>(
    data: T,
    keysFileList: string[],
  ): Promise<T> {
    if (typeof data !== 'object' || data === null) return data;
    if (!keysFileList.length) return data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData: Record<string, any> = structuredClone(data);

    // modificamos solo los campos que son FileList a base64 que se encuentran en keysFileList
    for (const keyFileList of keysFileList) {
      if (!newData[keyFileList]) continue;
      const imageFile = newData[keyFileList];
      try {
        const base64File = await FileUtil.toBase64(imageFile as FileList);
        newData[keyFileList] = base64File;
      } catch (error) {
        console.warn(
          `Error converting file to base64 in field \n\t\t{'${keyFileList}':'${imageFile}'}\n :`,
          error,
        );
      }
    }

    return newData as T;
  }
}
