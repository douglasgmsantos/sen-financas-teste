import React from 'react';

import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import TotalImg from '../../assets/total.svg';

import { useTransaction } from '../../hooks/useTransaction';

import { Container } from './styles';


const Summary: React.FC = () => {
  const { transactions } = useTransaction();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === "deposit") {
      acc.deposits += transaction.amout;
      acc.total += transaction.amout;
    } else {
      acc.withdraws -= transaction.amout;
      acc.total -= transaction.amout;
    }


    return acc;
  }, {
      deposits: 0,
      withdraws: 0,
      total: 0
    })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: "currency",
          currency: "BRL",
        }).format(summary.deposits)}</strong>
      </div >

      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: "currency",
          currency: "BRL",
        }).format(summary.withdraws)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={TotalImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: "currency",
          currency: "BRL",
        }).format(summary.total)}</strong>
      </div>
    </Container >
  )
}

export default Summary;