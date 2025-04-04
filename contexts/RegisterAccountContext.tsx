import { createContext, useState } from "react";
import { createUsername, dateToString } from "@/helpers/common";

export const RegisterAccountContext = createContext<any>(undefined);

export const RegisterAccountProvier = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    username: "",
  });

  const updateUser = (newInfo) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newInfo,
    }));
  };
  const saveUser = () => {
    setUser((prevUser) => ({
      ...prevUser,
    }));
  };
  const value = {
    user,
    saveUser,
    updateUser,
  };

  return (
    <RegisterAccountContext.Provider value={value}>
      {children}
    </RegisterAccountContext.Provider>
  );
};
