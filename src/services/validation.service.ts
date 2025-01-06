/**
 * Validates the title input.
 * @param title - The title to validate.
 * @returns A string with an error message if the title is invalid, otherwise null.
 */
const validateStrLength = (
  length: number,
  filedName: string,
  str?: string
): string | null => {
  if (!str || str.trim().length < length) {
    return `${filedName} must be at least ${length} characters long.`;
  }
  return null;
};

const validateArrayLength = (
  arr: unknown[],
  length: number,
  filedName: string
): string | null => {
  if (arr.length < length) {
    return `At least ${length} ${filedName} is required.`;
  }
  return null;
};

const validateExistence = (item: unknown, filedName: string): string | null => {
  if (!item) {
    return `${filedName} is required.`;
  }
  return null;
};

const validateLettersAndNumbers = (
  filedName: string,
  value?: string
): string | null => {
  if (!value) {
    return `${filedName} is required.`;
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return `${filedName} contain only letters and numbers.`;
  }
  return null;
};

export const validationService = {
  validateStrLength,
  validateArrayLength,
  validateExistence,
  validateLettersAndNumbers,
};
