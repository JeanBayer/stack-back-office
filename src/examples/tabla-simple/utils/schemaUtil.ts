import { ZodError } from 'zod';

type ExactFields = Record<string, unknown>;

export class SchemaUtil {
  public static filterValidFields<T>(
    exactFields: ExactFields,
    validationResult: ZodError<T>,
  ) {
    const errorPaths = new Set(
      validationResult.errors.map((error) => error.path.join('.')),
    );

    const filteredFields: ExactFields = {};
    for (const key in exactFields) {
      if (!errorPaths.has(key)) {
        filteredFields[key] = exactFields[key];
      }
    }

    return filteredFields;
  }
}
