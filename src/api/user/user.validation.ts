import { validationService } from "../../services/validation.service";
import { TUser } from "../../types/user.type";

/**
 * Validates the user data based on the provided IUserDto object.
 * Checks the username, email, permission, first name, last name, and password fields for validity.
 * Returns an array of error messages if any validation fails.
 *
 * @param userDto - The IUserDto object containing user data to be validated.
 * @returns An array of error messages indicating validation failures, or an empty array if all fields are valid.
 */
export const validateUserDto = (userDto: TUser) => {
  const errors: string[] = [];

  const emailError = _validateEmail(userDto?.email);
  if (emailError) errors.push(emailError);

  const firstNameErrorLen = validationService.validateStrLength(
    2,
    "First name",
    userDto?.firstName
  );

  if (firstNameErrorLen) errors.push(firstNameErrorLen);
  
  const firstNameError = validationService.validateLettersAndNumbers(
    "First name",
    userDto?.firstName
  );
  if (firstNameError) errors.push(firstNameError);

  const lastNameError = _validateLastName(userDto.lastName || "");
  if (lastNameError) errors.push(lastNameError);

  return errors;
};

/**
 * Private function.
 * Validates a username based on specific criteria.
 *
 * @param {string} username - The username to be validated.
 * @returns {string | null} A message if the username is invalid, or null if it is valid.
 */
const _validateUsername = (username: string): string | null => {
  const usernamePattern = /^[a-zA-Z0-9]+$/;
  if (!username || username.length < 2) {
    return "Username must be at least 3 characters long.";
  }
  if (!usernamePattern.test(username)) {
    return "Username can only contain letters and numbers.";
  }
  return null;
};

/**
 * Private function.
 * Validates the given email address.
 *
 * @param email - The email address to be validated.
 * @returns A message if the email is invalid, otherwise null.
 */
const _validateEmail = (email?: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return "Please provide a valid email address.";
  }
  return null;
};

/**
 * Private function.
 * Validates if the provided permission is one of the valid permissions.
 *
 * @param permission - The permission to validate.
 * @returns A string with the list of valid permissions if the provided permission is invalid, otherwise null.
 */
const _validatePermission = (permission: string): string | null => {
  const validPermissions = ["ADMIN", "MODERATOR", "USER", "THERAPIST"];
  if (!validPermissions.includes(permission)) {
    return `Permission must be one of: ${validPermissions.join(", ")}.`;
  }
  return null;
};

/**
 * Private function.
 * Validates the first name based on specific criteria.
 *
 * @param firstName - The first name to be validated.
 * @returns A message if the first name is invalid, otherwise null.
 */
const _validateFirstName = (firstName?: string): string | null => {
  if (!firstName || firstName.length < 2) {
    return "First name must be at least 2 characters long.";
  }
  return null;
};

/**
 * Private function.
 * Validates the last name based on specific criteria.
 *
 * @param lastName - The last name to be validated.
 * @returns A message if the last name is invalid, otherwise null.
 */
const _validateLastName = (lastName: string): string | null => {
  if (!lastName || lastName.length < 2) {
    return "Last name must be at least 2 characters long.";
  }
  return null;
};

/**
 * Private function.
 * Validates the password based on specific criteria.
 *
 * @param password - The password to be validated.
 * @returns A message if the password is invalid, otherwise null.
 */
const _validatePassword = (password: string): string | null => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!password || !passwordPattern.test(password)) {
    return "Password must be at least 6 characters long, contain at least one uppercase letter and one number.";
  }
  return null;
};
