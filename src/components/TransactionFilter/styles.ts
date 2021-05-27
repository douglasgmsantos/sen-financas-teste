import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 1rem;



  select, input {
    width: 15rem;
    height: 3rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 0;
  }

  input {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
`;
