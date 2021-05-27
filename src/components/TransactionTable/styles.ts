import styled from 'styled-components';

export const Container = styled.div`

margin-top: 4rem;

div {
  width: 100%;
  display: flex;
  align-items:center;
  justify-content:center;

  color: var(--text-title);
  font-weight: 600;
  font-size: 1.0rem;
}

table {
  width: 100%;
  border-spacing: 0 0.5rem;

  th {
    padding: 0rem 2rem;
    color: var(--text-body);
    font-weight: 400;
    text-align: left;
    line-height: 1.5rem;
  }

  td {
    padding: 1rem 2rem;
    border: 0;
    background: var(--shape);
    color: var(--text-body);
    border-radius: 0.25rem;

    &:first-child{
      color: var(--text-title);
    }

    &.deposit{
      color: var(--green);
    }

    &.withdraw{
      color: var(--red);
    }
  }
}
  
`;
