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

  public static toURLSearchParams(
    obj: Record<string, unknown> | object,
  ): URLSearchParams {
    const params = new URLSearchParams();
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    return params;
  }

  public static URLSearchParamsToObject(searchParams: URLSearchParams) {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }

  public static extractExactFields(
    data: Record<string, unknown>,
    validKeys: string[],
  ) {
    const extractedFields: Record<string, unknown> = {};

    for (const key of validKeys) {
      if (Object.prototype.hasOwnProperty.call(data, key))
        extractedFields[key] = data[key];
    }

    return extractedFields;
  }
}
