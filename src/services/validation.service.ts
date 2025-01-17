/**
 * Validates the title input.
 * @param title - The title to validate.
 * @returns A string with an error message if the title is invalid, otherwise null.
 */
const validateStrLength = (
  filedName: string,
  length: number,
  str?: string
): string | null => {
  if (!str || str.trim().length < length) {
    return `${filedName} must be at least ${length} characters long.`;
  }
  return null;
};

const validateArrayLength = (
  filedName: string,
  arr: unknown[],
  length: number
): string | null => {
  if (arr.length < length) {
    return `At least ${length} ${filedName} is required.`;
  }
  return null;
};

const validateExistence = (
  filedName: string,
  value: unknown
): string | null => {
  if (!value) {
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

const validateLetters = (filedName: string, value?: string): string | null => {
  if (!value) {
    return `${filedName} is required.`;
  }
  if (!/^[a-zA-Z]+$/.test(value)) {
    return `${filedName} contain only letters.`;
  }
  return null;
};

const validateNumbers = (
  filedName: string,
  value?: string | number | null
): string | null => {
  if (!value) {
    return `${filedName} is required.`;
  }
  if (!/^[0-9]+$/.test(value.toString())) {
    return `${filedName} contain only numbers.`;
  }
  return null;
};

const validateDate = (filedName: string, value?: Date): string | null => {
  if (!value) {
    return `${filedName} is required.`;
  }
  if (isNaN(value.getTime())) {
    return `${filedName} is invalid.`;
  }
  return null;
};

const validateDateStr = (filedName: string, value?: string): string | null => {
  if (!value) {
    return `${filedName} is required.`;
  }
  if (isNaN(Date.parse(value))) {
    return `${filedName} is invalid.`;
  }
  return null;
};

export const validationService = {
  validateStrLength,
  validateArrayLength,
  validateExistence,
  validateLettersAndNumbers,
  validateLetters,
  validateNumbers,
  validateDate,
  validateDateStr,
};
