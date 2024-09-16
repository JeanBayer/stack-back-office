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
}
