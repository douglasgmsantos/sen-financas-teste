import React, { useState } from 'react';

import Modal from 'react-modal';

import { GlobalStyle } from './styles/global';

import { TransactionProvider } from './hooks/useTransaction';

import { Header } from './components/Header';
import Dashboard from './components/Dashboard';

import NewTransactionModal from './components/NewTransactionModal';
import EditTransactionModal from './components/EditTransactionModal';

Modal.setAppElement("#root")

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleOpenNewTransactionModal = () => setIsNewTransactionModalOpen(true);
  const handleCloseNewTransactionModal = () => setIsNewTransactionModalOpen(false);

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

    </TransactionProvider>
  );
}
