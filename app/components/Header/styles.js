import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  height: 100px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TickerFragment = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
`;

export const Values = styled.div`
  width: 100%;
  display: inline-block;
  text-transform: uppercase;
  > div {
    text-align: center;
    width: 50%;
    float: left;
    font-size: 10px;
    > span {
      width: 100%;
      float: left;
    }
  }
`;

export const Connection = styled.div`
  display: inline-block;
  > button {
    float: left;
    background: #cccccc;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    margin: 0 15px;
    padding: 5px 10px;
  }
`;

export const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => (props.connection ? 'green' : 'red')};
  float: left;
  border-radius: 50%;
  border: 1px solid black;
  margin: 5px 0;
`;
