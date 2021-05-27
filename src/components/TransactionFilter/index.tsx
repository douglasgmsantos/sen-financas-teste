import React, { useState } from 'react';

import { useTransaction } from '../../hooks/useTransaction';
import { Container } from './styles';

const TransactionFilter: React.FC = () => {
  const {
    filterCategoryTransaction,
    filterTypeTransaction,
    dtInitTransaction,
    dtEndTransaction,
    handleFilterCategory,
    handleFilterType,
    handleDtInit,
    handleDtEnd,
    emptyFilter
  } = useTransaction();

  return (
    <Container>
      <select defaultValue="" onChange={(e) => handleFilterType(e.target.value)}>
        <option value="" disabled>Selecione uma categoria</option>
        <option selected={filterCategoryTransaction === "all"} value="all">Todos</option>
        <option selected={filterTypeTransaction === "deposit"} value="deposit">Entrada</option>
        <option selected={filterTypeTransaction === "withdraw"} value="withdraw">Saída</option>
      </select>
      <input onChange={(e) => handleFilterCategory(e.target.value)} value={filterCategoryTransaction} placeholder="Categoria" />
      <input type="date" value={dtInitTransaction} onChange={(e) => handleDtInit(e.target.value)} placeholder="Data inicial" />
      <input type="date" value={dtEndTransaction} onChange={(e) => handleDtEnd(e.target.value)} placeholder="Data final" />
      <button onClick={emptyFilter}> Limpar Filtros </button>
    </Container>
  )
}

export default TransactionFilter;