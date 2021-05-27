import React from 'react';

import { Container } from './styles';
import { useTransaction } from '../../hooks/useTransaction';

const TransactionTable: React.FC = () => {
  const { transactions } = useTransaction();

  return (
    <Container>
      {!transactions.length ? (
        <div>Nenhum dado foi encontrado. Por gentileza cadastre uma transação.</div>
      ) : (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}

    </Container>
  )
}

export default TransactionTable;