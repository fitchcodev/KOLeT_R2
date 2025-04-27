import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useCallback,
} from 'react';

export enum PaymentMethod {
  NFC = 'Tap to Pay',
  CARD = 'Card',
  ACCOUNT = 'Account',
}

export interface TransactionData {
  id: string;
  date: Date;
  amount: number;
  formattedAmount: string;
  narration: string;
  paymentMethod: PaymentMethod;
  status: 'Pending' | 'Successful' | 'Failed';
  user: {
    name: string;
    phone: string;
    id: string;
  };
}

const initialTransaction: TransactionData = {
  id: '',
  date: new Date(),
  amount: 0,
  formattedAmount: '₦0.00',
  narration: '',
  paymentMethod: PaymentMethod.CARD,
  status: 'Pending',
  user: {
    name: '',
    phone: '',
    id: '',
  },
};

interface TransactionContextType {
  transaction: TransactionData;
  saveTransaction: (data: Partial<TransactionData>) => void;
  getTransaction: () => TransactionData;
  clearTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType>({
  transaction: initialTransaction,
  saveTransaction: () => initialTransaction,
  getTransaction: () => initialTransaction,
  clearTransaction: () => {},
});

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

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transaction, setTransaction] =
    useState<TransactionData>(initialTransaction);

  // Keep a synchronized ref to avoid stale closures
  const transactionRef = useRef<TransactionData>(initialTransaction);

  const saveTransaction = useCallback((data: Partial<TransactionData>) => {
    const updatedTransaction = {
      ...transactionRef.current,
      ...data,
    };

    // Update the ref to keep it in sync
    transactionRef.current = updatedTransaction;

    // Update the state to trigger re-renders
    setTransaction(updatedTransaction);

    return updatedTransaction;
  }, []);

  const getTransaction = useCallback(() => {
    return transactionRef.current;
  }, []);

  const clearTransaction = useCallback(() => {
    transactionRef.current = initialTransaction;
    setTransaction(initialTransaction);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transaction,
        saveTransaction,
        getTransaction,
        clearTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
