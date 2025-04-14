import React, { createContext, useState, useContext, ReactNode } from "react";

export enum PaymentMethod {
  NFC = "Tap to Pay",
  CARD = "Card",
  ACCOUNT = "Account",
}

export interface TransactionData {
  id: string;
  date: Date;
  amount: number;
  narration: string;
  paymentMethod: PaymentMethod;
  status: "Pending" | "Successful" | "Failed";
  user: {
    name: string;
    phone: string;
    id: string;
  };
}

interface TransactionContextType {
  saveTransaction: (data: Partial<TransactionData>) => void;
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

  const saveTransaction = (data: Partial<TransactionData>) => {
    setTransaction((prevTransaction) =>
      prevTransaction
        ? ({ ...prevTransaction, ...data } as TransactionData)
        : ({ ...data } as TransactionData)
    );
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
