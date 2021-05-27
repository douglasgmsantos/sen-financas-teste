import React, { useState } from 'react';

import { Container } from './styles';

interface ITransactionFilter {
  dtInit: string;
  dtEnd: string;
  filterCategory: string;
  filterType: string;
  handleFilterCategory(text: string): void;
  handleFilterType(text: string): void;
  handleDtInit(text: string): void;
  handleDtEnd(text: string): void;
}

const TransactionFilter: React.FC<ITransactionFilter> = ({
  handleFilterCategory,
  handleFilterType,
  filterCategory,
  filterType,
  dtInit,
  dtEnd,
  handleDtInit,
  handleDtEnd
}: ITransactionFilter) => {

  return (
    <Container>
      <select defaultValue="" onChange={(e) => handleFilterType(e.target.value)}>
        <option value="" disabled>Selecione uma categoria</option>
        <option selected={filterType == "all"} value="all">Todos</option>
        <option selected={filterType == "deposit"} value="deposit">Entrada</option>
        <option selected={filterType == "withdraw"} value="withdraw">Saída</option>
      </select>
      <input onChange={(e) => handleFilterCategory(e.target.value)} value={filterCategory} placeholder="Categoria" />
      <input type="date" value={dtInit} onChange={(e) => handleDtInit(e.target.value)} placeholder="Data inicial" />
      <input type="date" value={dtEnd} onChange={(e) => handleDtEnd(e.target.value)} placeholder="Data final" />
    </Container>
  )
}

export default TransactionFilter;