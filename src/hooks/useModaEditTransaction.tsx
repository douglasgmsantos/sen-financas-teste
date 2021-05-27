import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Omit } from "yargs";
import cookies from 'cookies-js';
import { v4 as uuidv4 } from 'uuid';


interface ITransaction {
  id: string;
  title: string;
  amout: number;
  type: string;
  category: string;
  createdAt: string;
}

type ICreateTransaction = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionProvider {
  children: ReactNode
}

interface ITransactionContext {
  transactions: ITransaction[];
  createNewTransaction(transaction: ICreateTransaction): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

export const TransactionProvider = ({ children }: ITransactionProvider) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const transactionCookie = cookies.get("@SEFINANCES:transactions")
    if (Boolean(transactionCookie)) {
      var transactions = JSON.parse(cookies.get("@SEFINANCES:transactions"));
      setTransactions(transactions);
    }
  }, []);

  const createNewTransaction = async (transactionCreate: ICreateTransaction) => {
    const transaction = {
      ...transactionCreate,
      id: uuidv4(),
      createdAt: new Date().toString()
    } as ITransaction

    cookies.set("@SEFINANCES:transactions", JSON.stringify([...transactions, transaction]));
    setTransactions([...transactions, transaction])
  }



  const deleteTransaction = async (id: string) => {
    const newTransactions = transactions.filter((transaction: ITransaction) => transaction.id !== id);
    cookies.set("@SEFINANCES:transactions", JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createNewTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionsContext);

  return context;
}