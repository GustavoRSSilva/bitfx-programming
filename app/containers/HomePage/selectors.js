import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONNECTION, TICKER, TRADES, BOOK } from './constants';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);

/**
 * Other specific selectors
 */
const selectConnection = () =>
  createSelector(selectHomePageDomain, subState => subState.get(CONNECTION));

const selectTicker = () =>
  createSelector(selectHomePageDomain, subState => subState.get(TICKER));

const selectTrades = () =>
  createSelector(selectHomePageDomain, subState => subState.get(TRADES));

const selectBook = () =>
  createSelector(selectHomePageDomain, subState => subState.get(BOOK));

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  selectTicker,
  selectConnection,
  selectTrades,
  selectBook,
};
