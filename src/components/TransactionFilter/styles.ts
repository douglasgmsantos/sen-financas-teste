import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 1rem;



  select, input , button{
    width: 15rem;
    height: 3rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 0;
    color: #000;
    background: var(--shape);
  }

  button {
    margin-left: 1rem;
    color:var(--shape);
    background: var(--blue-ligth);

    transition: filter 0.2s;

    &:hover{
      filter: brightness(0.9);
    }
  }

  input {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
`;
