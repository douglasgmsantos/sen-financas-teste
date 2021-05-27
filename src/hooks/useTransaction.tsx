import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Omit } from "yargs";
import cookies from 'cookies-js';

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
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

export const TransactionProvider = ({ children }: ITransactionProvider) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const transactionCookie = cookies.get("@SEFINANCES:transactions")
    if (Boolean(transactionCookie)) {
      var transactions = JSON.parse(cookies.get("@SEFINANCES:transactions"));
      setTransactions(transactions)
    }
  }, []);

  const createNewTransaction = async (transactionCreate: ICreateTransaction) => {
    const transaction = {
      ...transactionCreate,
      createdAt: new Date().toString()
    } as ITransaction

    cookies.set("@SEFINANCES:transactions", JSON.stringify(transaction));
    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createNewTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionsContext);

  return context;
}