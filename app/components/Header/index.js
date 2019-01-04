/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import BitcoinLogo from 'assets/img/bitcoin.svg';

import { Wrapper, TickerFragment, Values, Circle, Connection } from './styles';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  renderConnection() {
    const { connection, initConnection, closeConnection } = this.props;
    return (
      <Connection>
        <button onClick={closeConnection}>Disconnect</button>
        <button onClick={initConnection}>Connect</button>
        <Circle connection={connection} />
      </Connection>
    );
  }

  renderTicker() {
    const { ticker } = this.props;
    if (!ticker.length) {
      return null;
    }

    const ti = ticker.replace(/[\[\]']+/g, '').split(',');

    const [
      channelId,
      bid,
      bidSize,
      ask,
      askSize,
      dailyChange,
      dailyChangePer,
      lastPrice,
      volume,
      high,
      low,
    ] = ti;

    return (
      <TickerFragment>
        <img src={BitcoinLogo} alt="bitcoin" />
        <Values>
          <div>
            <span>BTC/USD - {lastPrice}</span>
            <span>Volume - {(volume * lastPrice).toFixed(2)} USD</span>
            <span>low - {low}</span>
          </div>
          <div>
            <span>high - {high}</span>
            <span>low - {low}</span>
            <span>
              Daily change {dailyChange} - {dailyChangePer}%
            </span>
          </div>
        </Values>
      </TickerFragment>
    );
  }
  render() {
    return (
      <Wrapper>
        <h1>Bitfinex</h1>
        {this.renderConnection()}
        {this.renderTicker()}
      </Wrapper>
    );
  }
}

Header.propTypes = {
  connection: PropTypes.bool.isRequired,
  initConnection: PropTypes.func.isRequired,
  closeConnection: PropTypes.func.isRequired,
};

export default Header;
