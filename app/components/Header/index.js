/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import BitcoinLogo from 'assets/img/bitcoin.svg';

import { Wrapper, TickerFragment, Img } from './styles';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  renderTicker() {
    const { ticker } = this.props;
    console.log(ticker);
    if (!ticker.length) {
      return null;
    }

    const [
      channelId,
      [
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangePer,
        lastPrice,
        volume,
        high,
        low
      ]
    ] = ticker;


    // // Trading pairs
    // [
    //   CHANNEL_ID,
    //   [
    //     BID,
    //     BID_SIZE,
    //     ASK,
    //     ASK_SIZE,
    //     DAILY_CHANGE,
    //     DAILY_CHANGE_PERC,
    //     LAST_PRICE,
    //     VOLUME,
    //     HIGH,
    //     LOW
    //   ]
    // ]


    return (
      <TickerFragment>
        <Img src={BitcoinLogo} alt="bitcoin" />
        <div>
          <div>BTC/USD - {lastPrice}</div>
          <div>Volume - {volume * lastPrice} USD</div>
          <div>low - {low}</div>
          <div>high - {high} - {low}</div>
          <div>{dailyChange} - {dailyChangePer}%</div>
        </div>
      </TickerFragment>
    );
  }
  render() {
    return (
      <Wrapper>
        <h1>Bitfinex</h1>
        {this.renderTicker()}
      </Wrapper>
    );
  }
}

Header.propTypes = {
  tickerValues: PropTypes.object,
  connection: PropTypes.bool.isRequired,
  initConnection: PropTypes.func.isRequired,
  ticker: PropTypes.object.isRequired,
};

export default Header;
