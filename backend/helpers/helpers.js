// Validate First Name
export const validFN = (firstName) => {
  if (
    !firstName ||
    typeof firstName !== "string" ||
    firstName.trim().length < 2 ||
    firstName.trim().length > 25 ||
    /\d/.test(firstName)
  ) {
    return false;
  }
  return true;
};

// Validate Last Name
export const validLN = (lastName) => {
  if (
    !lastName ||
    typeof lastName !== "string" ||
    lastName.trim().length < 2 ||
    lastName.trim().length > 25 ||
    /\d/.test(lastName)
  ) {
    return false;
  }
  return true;
};

// Validate Email Address
export const validEmail = (emailAddress) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailAddress.trim());
};

// Validate Username
export const validUser = (username) => {
  if (
    !username ||
    typeof username !== "string" ||
    username.trim().length > 25
  ) {
    return false;
  }
  return true;
};

// Validate Password
export const validPass = (password) => {
  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    !/[A-Z]/.test(password) || // At least one uppercase letter
    !/\d/.test(password) || // At least one digit
    !/[!@#$%^&*]/.test(password) // At least one special character
  ) {
    return false;
  }
  return true;
};
