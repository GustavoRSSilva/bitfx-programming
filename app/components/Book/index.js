/**
 *
 * Trades
 *
 */

import React from 'react';

import { Table, Status, Title } from './styles';
/* eslint-disable react/prefer-stateless-function */
class Book extends React.PureComponent {
  render() {
    const { book = [] } = this.props;
    return (
      <div>
        <Title>book</Title>
        <Table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {book.map((b, index) => {
              if (!b[1]) {
                return null;
              }
              return (
                <tr key={`-  ${index}`}>
                  <td>{b[1][1]}</td>
                  <td>{parseFloat(b[1][2]).toFixed(2)}</td>
                  <td>
                    {(parseFloat(b[1][1]) * parseFloat(b[1][2])).toFixed(2)}
                  </td>
                  <td>{parseFloat(b[1][0]).toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Book;
