import { Dimensions } from "react-native";


const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
export const wp = percentage=>{
    const width = deviceWidth;
    return (percentage*width) /100};

export const hp = percentage=>{
const height = deviceHeight;
return (percentage*height) /100};


export const capitalize = str=>{return str.replace(/\b\w/g,l=>l.toUpperCase())}
export const validateEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to format date in DD-MM-YYYY format
  export const formatDate = (date) => {
    if (date !== '') {
      const options = {day: '2-digit', month: '2-digit', year: 'numeric',  };
      return date.toLocaleDateString('en-US', options);
    } else {
      return date;
    }
  };

 export const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Test the password against the regular expression
    return passwordRegex.test(password);
  };

export  const validateNigerianPhoneNumber = phoneNumber => {
    // Regular expression for Nigerian phone numbers
    const nigerianPhoneNumberRegex = /^(?:\+?234|0)?[789]\d{9}$/;

    // Test if the phone number matches the regex
    return nigerianPhoneNumberRegex.test(phoneNumber);
  };
