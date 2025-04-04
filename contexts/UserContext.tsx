import { createContext, useState } from 'react';

export const UserContext = createContext<any>(undefined);

export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  username: string;
};

export const UserProvier = ({ children }) => {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    username: '',
  });

  const updateUser = (newInfo: User) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newInfo,
    }));
  };
  const saveUser = () => {
    setUser(prevUser => prevUser);
  };
  const value = {
    user,
    saveUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
