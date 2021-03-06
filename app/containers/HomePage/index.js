/**
 *
 * HomePage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import Header from 'components/Header';
import Trades from 'components/Trades';
import Book from 'components/Book';

import { TICKER, TRADES, BOOK } from './constants';
import * as actions from './actions';
import {
  selectTicker,
  selectConnection,
  selectTrades,
  selectBook,
} from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ws = {};

    this.initWebsocket = this.initWebsocket.bind(this);
    this.closeChannels = this.closeChannels.bind(this);
  }

  componentWillMount() {
    this.initWebsocket();
  }

  initWebsocket() {
    const { setConnection, setChannel } = this.props;

    const availableSockets = [TICKER, TRADES, BOOK];

    availableSockets.map(channel => {
      this.ws[channel] = new WebSocket('wss://api.bitfinex.com/ws/2');

      this.ws[channel].onmessage = msg => {
        let data = msg.data;
        switch (channel) {
          case TICKER:
            if (!(typeof data === 'string' && data.includes('hb'))) {
              setChannel(channel, msg.data);
            }
            break;

          case TRADES:
            const { trades = [] } = this.props;
            if (!(typeof data === 'string' && data.includes('hb'))) {
              data = JSON.parse(data);
              if (data[1] === 'tu' || data[1] === 'te') {
                setChannel(channel, [...trades, data]);
              }
            }

            break;

          case BOOK:
            const { book = [] } = this.props;
            if (!(typeof data === 'string' && data.includes('hb'))) {
              data = JSON.parse(data);
              if (data[0] && data[1] && data[1][1] !== 0) {
                setChannel(channel, [...book, data]);
              }
            }
            break;
        }
      };

      const msg = JSON.stringify({
        event: 'subscribe',
        channel,
        symbol: 'tBTCUSD',
      });

      this.ws[channel].onopen = e => {
        setConnection(true);
        return this.ws[channel].send(msg);
      };
      this.ws[channel].onclose = e => {
        setConnection(false);
      };
    });
  }

  closeChannels() {
    const availableSockets = [TICKER, TRADES, BOOK];

    availableSockets.map(channel => {
      this.ws[channel].close();
    });
  }

  renderTrades() {
    const { trades } = this.props;
    return <Trades trades={trades} />;
  }

  renderBook() {
    const { book } = this.props;
    return <Book book={book} />;
  }

  render() {
    const { connection, ticker } = this.props;
    return (
      <div>
        <Header
          connection={connection}
          initConnection={this.initWebsocket}
          ticker={ticker}
          closeConnection={this.closeChannels}
        />
        {this.renderTrades()}
        {this.renderBook()}
      </div>
    );
  }
}

HomePage.propTypes = {
  connection: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  connection: selectConnection(),
  ticker: selectTicker(),
  trades: selectTrades(),
  book: selectBook(),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(HomePage);
