/**
 *
 * Trades
 *
 */

import React from 'react';

import { Table, Status, Title } from './styles';
/* eslint-disable react/prefer-stateless-function */
class Trades extends React.PureComponent {
  render() {
    const { trades = [] } = this.props;

    console.log(trades);
    return (
      <div>
        <Title>trades</Title>
        <Table>
          <thead>
            <tr>
            <th></th>
            <th>Time</th>
            <th>Price</th>
            <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => {
              console.log(trade);
              const time = new Date(trade[2][1]).toString();
              return (
                <tr key={time}>
                <td><Status up={trade[1] === 'tu'}/></td>
                <td>{time}</td>
                <td>{trade[2][3]}</td>
                <td>{trade[2][2]}</td>
                </tr>
              );
            })}
          </tbody>

        </Table>
      </div>
    );
  }
}

export default Trades;
