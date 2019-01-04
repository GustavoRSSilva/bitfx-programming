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

import { TICKER, TRADES, BOOK } from './constants';
import * as actions from './actions';
import { selectTicker, selectConnection } from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ws = {};

    this.initWebsocket = this.initWebsocket.bind(this);
  }

  componentWillMount() {
    this.initWebsocket();
  }

  initWebsocket() {
    const { setConnection, setChannel } = this.props;

    const availableSockets = [
      TICKER,
      // TRADES,
      // BOOK
    ];

    availableSockets.map(channel => {
      this.ws[channel] = new WebSocket('wss://api.bitfinex.com/ws/2');

      this.ws[channel].onmessage = msg => {
        const data = msg.data;
        if (!(typeof data === 'string' && data.includes('hb'))) {
          setChannel(channel, msg.data);
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

  render() {
    const { connection, ticker } = this.props;
    return (
      <div>
        <Header
          connection={connection}
          initConnection={this.initWebsocket}
          ticker={ticker}
        />
        Homepage
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
