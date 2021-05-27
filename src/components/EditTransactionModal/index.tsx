import React, { useState, FormEvent, useEffect } from 'react';

import Modal from "react-modal";

import CloseImg from '../../assets/close.svg';

import OutcomeImg from '../../assets/outcome.svg';
import IncomeImg from '../../assets/income.svg';

import { useTransaction } from '../../hooks/useTransaction';


import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface IEditTransactionModal {
  isOpen: boolean;
  idTransactionEditable: string;
  onRequestClose(): void;
}

const EditTransactionModal: React.FC<IEditTransactionModal> = ({ isOpen, onRequestClose, idTransactionEditable }) => {
  const { updateTransaction, transactions } = useTransaction();


  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [amout, setAmout] = useState(0);
  const [category, setCategory] = useState("");

  const handleSetTypeDeposit = () => setType("deposit");
  const handleSetTypeWithdraw = () => setType("withdraw");

  useEffect(() => {

    const loadTransaction = async () => {
      if (!Boolean(idTransactionEditable)) return;
      const [transaction] = await transactions.filter(transaction => transaction.id === idTransactionEditable);

      setType(transaction.type);
      setTitle(transaction.title);
      setAmout(transaction.amout);
      setCategory(transaction.category);
    }

    loadTransaction();

  }, [idTransactionEditable, transactions])

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();

    await updateTransaction(idTransactionEditable, {
      type,
      title,
      amout,
      category
    });

    onRequestClose();
    setType("deposit");
    setTitle("");
    setAmout(0);
    setCategory("");
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close" type="button" onClick={onRequestClose}>
        <img src={CloseImg} alt="Fechar" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Edite transação</h2>

        <input onChange={event => setTitle(event.target.value)} value={title} placeholder="Título" />
        <input onChange={event => setAmout(Number(event.target.value))} value={amout} type="number" placeholder="Valor" />

        <TransactionTypeContainer>
          <RadioBox activeColor="green" isActive={type === "deposit"} type="button" onClick={handleSetTypeDeposit}>
            <img src={IncomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox activeColor="red" isActive={type === "withdraw"} type="button" onClick={handleSetTypeWithdraw}>
            <img src={OutcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input onChange={event => setCategory(event.target.value)} value={category} placeholder="Categoria" />

        <button type="submit">Salvar</button>
      </Container>
    </Modal>
  )
}

export default EditTransactionModal;