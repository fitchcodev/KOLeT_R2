import React, { createContext, useState, useContext, ReactNode } from "react";

interface TransactionData {
  amount: number;
  narration: string;
}

interface TransactionContextType {
  saveTransaction: (amount: number, narration: string) => void;
  getTransaction: () => TransactionData | null;
  clearTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transaction, setTransaction] = useState<TransactionData | null>(null);

  const saveTransaction = (amount: number, narration: string) => {
    setTransaction({ amount, narration });
  };

  const getTransaction = (): TransactionData | null => {
    return transaction;
  };

  const clearTransaction = () => {
    setTransaction(null);
  };

  return (
    <TransactionContext.Provider
      value={{ saveTransaction, getTransaction, clearTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
