import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TransactionContextType {
  saveTransactionAmount: (amount: string) => void;
  getTransactionAmount: () => string | null;
  clearTransactionAmount: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactionAmount, setTransactionAmount] = useState<string | null>(null);

  const saveTransactionAmount = (amount: string) => {
    setTransactionAmount(amount);
  };

  const getTransactionAmount = (): string | null => {
    return transactionAmount;
  };

  const clearTransactionAmount = () => {
    setTransactionAmount(null);
  };

  return (
    <TransactionContext.Provider value={{ saveTransactionAmount, getTransactionAmount, clearTransactionAmount }}>
      {children}
    </TransactionContext.Provider>
  );
};
