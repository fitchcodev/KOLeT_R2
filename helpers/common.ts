import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
export const wp = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const capitalize = str => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
};
export const validateEmail = email => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to format date in DD-MM-YYYY format
export const formatDate = (date: Date) => {
  if (date) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  } else {
    return date;
  }
};

export const validatePassword = (password: string) => {
  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Test the password against the regular expression
  return passwordRegex.test(password);
};

export const validateNigerianPhoneNumber = (phone: string) => {
  // Regular expression for Nigerian phone numbers
  const nigerianPhoneNumberRegex = /^(?:\+?234|0)?[789]\d{9}$/;

  // Test if the phone number matches the regex
  return nigerianPhoneNumberRegex.test(phone);
};

export const validateDate = (date: Date) => {
  // At least 16 years old
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();

  return age >= 16;
};

export const dateToString = (date: Date) => {
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours()
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds()
  ).padStart(2, '0')}`;

  return dateStr;
};

export const createUsername = (firstName: string, lastName: string) => {
  // Create a username by concatenating the first letter of the first name and the last name
  return `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`;
};

/**
 * Generates a unique ID in the format QR followed by 6 digits and a letter
 * Example: QR165789D
 */
export const generateQRId = (): string => {
  // Generate random 6-digit number
  const digits = Math.floor(100000 + Math.random() * 900000);

  // Generate random uppercase letter (A-Z)
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // Combine in the required format
  return `QR${digits}${letter}`;
};

// Dec 27th 2023 2:25
export const toTransactionDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};
