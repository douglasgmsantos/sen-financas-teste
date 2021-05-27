import React from 'react';

import { Container } from './styles';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useTransaction } from '../../hooks/useTransaction';

interface ITransactionTable {
  onOpenEditTransactionModal(id: string): void;
}

const TransactionTable: React.FC<ITransactionTable> = ({ onOpenEditTransactionModal }: ITransactionTable) => {
  const { transactions, deleteTransaction } = useTransaction();

  const handleDeleteTransaction = (id: string) => deleteTransaction(id);
  const handleEditTransaction = (id: string) => onOpenEditTransactionModal(id);

  return (
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
              {transactions.map(transaction => (
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
  )
}

export default TransactionTable;