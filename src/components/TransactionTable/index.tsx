import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { Container } from './styles';

import TransactionFilter from '../TransactionFilter';

import { useTransaction } from '../../hooks/useTransaction';
import { number } from 'prop-types';

interface ITransactionTable {
  onOpenEditTransactionModal(id: string): void;
}

const TransactionTable: React.FC<ITransactionTable> = ({ onOpenEditTransactionModal }: ITransactionTable) => {
  const { transactions, deleteTransaction } = useTransaction();
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dtInit, setDtInit] = useState("");
  const [dtEnd, setDtEnd] = useState("");

  const handleDeleteTransaction = (id: string) => deleteTransaction(id);
  const handleEditTransaction = (id: string) => onOpenEditTransactionModal(id);

  const handleFilterCategory = (text: string) => setFilterCategory(text);
  const handleFilterType = (text: string) => setFilterType(text);

  const handleDtInit = (text: string) => setDtInit(text);
  const handleDtEnd = (text: string) => setDtEnd(text);

  return (
    <>
      <TransactionFilter
        dtInit={dtInit}
        dtEnd={dtEnd}
        filterCategory={filterCategory}
        filterType={filterType}
        handleFilterCategory={handleFilterCategory}
        handleFilterType={handleFilterType}
        handleDtInit={handleDtInit}
        handleDtEnd={handleDtEnd}
      />
      <Container>
        {!transactions.length ? (
          <div>Nenhum dado foi encontrado. Por gentileza cadastre uma nova transação...</div>
        ) : (
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .filter(transaction => filterType == "all" || (transaction.type == filterType))
                  .filter(transaction => filterCategory == "" || (transaction.category.toLocaleUpperCase().indexOf(filterCategory.toLocaleUpperCase()) != -1))
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
                  })
                  .map(transaction => (
                    <tr key={transaction.id}>
                      <td>{transaction.title}</td>
                      <td className={transaction.type}>
                        {new Intl.NumberFormat('pt-BR', {
                          style: "currency",
                          currency: "BRL",
                        }).format(transaction.amout)}
                      </td>
                      <td>{transaction.category}</td>
                      <td>{new Intl.DateTimeFormat().format(new Date(transaction.createdAt))}</td>
                      <td>
                        <div className="edit" onClick={() => handleEditTransaction(transaction.id)}>
                          <FaRegEdit size={20} />
                        </div>
                      </td>
                      <td>
                        <div className="remove" onClick={() => handleDeleteTransaction(transaction.id)}>
                          <FaRegTrashAlt size={20} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

      </Container>
    </>
  )
}

export default TransactionTable;