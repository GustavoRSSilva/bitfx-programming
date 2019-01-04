import styled from 'styled-components';

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 34px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 20px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin: 20px auto;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const Status = styled.div`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: ${props => (props.up ? 'green' : 'red')};
`;
