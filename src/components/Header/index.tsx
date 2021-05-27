import React from 'react';

import LogoImg from '../../assets/logo.svg'
import { Container, Content } from './styles';

interface IHeader {
  onOpenNewTransactionModal(): void;
}

export const Header: React.FC<IHeader> = ({ onOpenNewTransactionModal }) => {
  return (
    <Container>
      <Content>
        <label>
          <img src={LogoImg} alt="SeFinancas" /> <span>SeFinanças</span>
        </label>
        <button onClick={onOpenNewTransactionModal}> Nova Transação </button>
      </Content>
    </Container>
  );
}
