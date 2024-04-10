export const AppValidation = () => {
  const customValidateField = (
    value: string
  ): { isValid: boolean; errorMessage: string } => {
    if (value.trim() === "") {
      return { isValid: false, errorMessage: "THis field is required" };
    }
    return { isValid: true, errorMessage: "" };
  };

  const customValidateEmail = (
    email: string
  ): { isValid: boolean; errorMessage: string } => {
    if (email.trim() === "") {
      return {
        isValid: false,
        errorMessage: "Please enter your email address",
      };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return {
        isValid: false,
        errorMessage: "Please enter a valid email address",
      };
    }
    return { isValid: true, errorMessage: "" };
  };

  const validateIsInteger = (
    input: string
  ): { isValid: boolean; errorMessage: string } => {
    if (!input) {
      return {
        isValid: false,
        errorMessage: "THis field is required",
      };
    } else if (!Number.isInteger(Number(input))) {
      return {
        isValid: false,
        errorMessage: "Please enter a valid integer number",
      };
    }
    return { isValid: true, errorMessage: "" };
  };

  const validateIsDouble = (
    input: string
  ): { isValid: boolean; errorMessage: string } => {
    if (!input) {
      return {
        isValid: false,
        errorMessage: "This field is required to be a number", // More specific error message
      };
    }

    // Consider a custom type or direct boolean return with error message
    // const isValid = /^\d+(\.\d{1,2})?$/.test(input);
    // return { isValid, errorMessage: isValid ? '' : 'Please enter a valid double number' };

    const doubleRegex = /^\d+(?:\.\d{1,2})?$/; // Break down regex for clarity
    if (!doubleRegex.test(input)) {
      return {
        isValid: false,
        errorMessage: "Please enter a valid double number",
      };
    }
    return { isValid: true, errorMessage: "" };
  };

  const validatePhoneNo = (
    input: string
  ): { isValid: boolean; errorMessage: string } => {
    if (!input) {
      return {
        isValid: false,
        errorMessage: "Phone no is required",
      };
    } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(input)) {
      return {
        isValid: false,
        errorMessage: "Please provide correct Phone no",
      };
    }
    return { isValid: true, errorMessage: "" };
  };

  return {
    customValidateField,
    customValidateEmail,
    validateIsInteger,
    validateIsDouble,
    validatePhoneNo
  };
};
