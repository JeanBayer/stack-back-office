export class ObjectUtil {
  public static getChangedFields<T>(oldData: T, newData: T): Partial<T> {
    const changedFields: Partial<T> = {};

    for (const key in newData) {
      if (newData?.[key] !== oldData?.[key]) changedFields[key] = newData[key];
    }

    return structuredClone(changedFields);
  }

  public static listMatchKeys<T>(data: T, keysToMatch: string[]): string[] {
    if (typeof data !== 'object') return [];
    if (!data) return [];

    const keysData = Object.keys(data);

    // Return the keys that match in the data
    return keysToMatch.filter((keyToMatch) => keysData.includes(keyToMatch));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toFormData(obj: Record<string, any>): FormData {
    const formData = new FormData();
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }
}
