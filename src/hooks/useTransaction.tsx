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
type IUpdateTransaction = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionProvider {
  children: ReactNode
}

interface ITransactionContext {
  transactions: ITransaction[];
  createNewTransaction(transaction: ICreateTransaction): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  updateTransaction(id: string, transaction: IUpdateTransaction): Promise<void>;
  filterCategoryTransaction: string;
  filterTypeTransaction: string;
  dtInitTransaction: string;
  dtEndTransaction: string;
  handleFilterCategory(text: string): void;
  handleFilterType(text: string): void;
  handleDtInit(text: string): void;
  handleDtEnd(text: string): void;
  emptyFilter(): void;
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

export const TransactionProvider = ({ children }: ITransactionProvider) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dtInit, setDtInit] = useState("");
  const [dtEnd, setDtEnd] = useState("");

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
    const newTransactions = transactions.filter((transaction: ITransaction) => transaction.id != id);
    cookies.set("@SEFINANCES:transactions", JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  }

  const updateTransaction = async (id: string, transactionEdit: ICreateTransaction) => {
    let newTransactions = JSON.parse(JSON.stringify(transactions));

    const index = newTransactions.findIndex((transaction: ITransaction) => transaction.id === id);
    newTransactions[index] = {
      ...transactionEdit,
      id,
      createdAt: newTransactions[index].createdAt
    }

    cookies.set("@SEFINANCES:transactions", JSON.stringify(newTransactions));
    setTransactions(newTransactions);
  }

  const emptyFilter = () => {
    setFilterCategory("")
    setFilterType("all")
    setDtInit("")
    setDtEnd("")
  }

  return (
    <TransactionsContext.Provider value={{
      transactions: transactions.filter(transaction => filterType === "all" || (transaction.type === filterType))
        .filter(transaction => filterCategory === "" || (transaction.category.toLocaleUpperCase().indexOf(filterCategory.toLocaleUpperCase()) != -1))
        .filter(transaction => {
          const dtTransactionFormat = Intl.DateTimeFormat("pt-BR").format(new Date(transaction.createdAt)).split("/").reverse().join().toString().replaceAll(",", "");
          const dtInitFormat = dtInit.split("-").join().toString().replaceAll(",", "");
          const dtEndFormat = dtEnd.split("-").join().toString().replaceAll(",", "");

          if (dtInit !== "" && dtEnd !== "")
            return Number(dtTransactionFormat) >= Number(dtInitFormat) && Number(dtTransactionFormat) <= Number(dtEndFormat)
          if (dtInit !== "")
            return Number(dtTransactionFormat) >= Number(dtInitFormat)
          if (dtEndFormat !== "")
            return Number(dtTransactionFormat) <= Number(dtEndFormat)
          return true
        }),
      createNewTransaction,
      deleteTransaction,
      updateTransaction,
      filterCategoryTransaction: filterCategory,
      filterTypeTransaction: filterType,
      dtInitTransaction: dtInit,
      dtEndTransaction: dtEnd,
      handleFilterCategory: setFilterCategory,
      handleFilterType: setFilterType,
      handleDtInit: setDtInit,
      handleDtEnd: setDtEnd,
      emptyFilter
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionsContext);

  return context;
}