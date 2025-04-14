import { createContext, ReactNode, useState } from 'react';

export const UserContext = createContext<any>(undefined);

export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  username: string;
};

// Add a properly typed initial state for reset
const initialState: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  username: '',
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(initialState);

  const updateUser = (newInfo: User) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newInfo,
    }));
  };
  const saveUser = () => {
    setUser(prevUser => prevUser);
  };

  const resetUser = () => {
    setUser(initialState);
  };

  const value = {
    user,
    saveUser,
    updateUser,
    resetUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
