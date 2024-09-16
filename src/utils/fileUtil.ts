// import { ObjectUtil } from '@/utils';

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

    // const changedFieldsKeysImage = ObjectUtil.listMatchKeys(data, keysFileList);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData: Record<string, any> = structuredClone(data);

    // modificamos solo los campos que son FileList a base64 que se encuentran en changedFieldsKeysImage
    // for (const keyImage of changedFieldsKeysImage) {
    for (const keyImage of keysFileList) {
      if (!newData[keyImage]) continue;
      const imageFile = newData[keyImage];
      try {
        const base64File = await FileUtil.toBase64(imageFile as FileList);
        newData[keyImage] = base64File;
      } catch (error) {
        console.warn(
          `Conflict in converting file to base64 in field \n\t\t{'${keyImage}':'${imageFile}'}\n :`,
          error,
        );
      }
    }

    return newData as T;
  }
}
