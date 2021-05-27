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
        <img src={LogoImg} alt="dt money" />
        <button onClick={onOpenNewTransactionModal}> Nova Transação </button>
      </Content>
    </Container>
  );
}
