import React, { useState } from 'react';

import Summary from '../Summary';
import TransactionTable from '../TransactionTable';
import EditTransactionModal from '../EditTransactionModal';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
  const [idTransactionEditable, setidTransactionEditable] = useState("");

  const handleOpenEditTransactionModal = (id: string) => {
    setIsEditTransactionModalOpen(true);
    setidTransactionEditable(id)
  };
  const handleCloseEditTransactionModal = () => setIsEditTransactionModalOpen(false);

  return (
    <Container>
      <Summary />
      <TransactionTable onOpenEditTransactionModal={handleOpenEditTransactionModal} />

      <EditTransactionModal isOpen={isEditTransactionModalOpen} onRequestClose={handleCloseEditTransactionModal} idTransactionEditable={idTransactionEditable} />
    </Container>
  )
}

export default Dashboard;