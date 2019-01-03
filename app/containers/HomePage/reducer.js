/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CONNECTION,
  SET_CONNECTION,
  TICKER,
  TRADES,
  BOOK,
  SET_CHANNEL,
} from './constants';

const setState = (requesting = false, error = null, data = null) => ({
  requesting,
  error,
  data,
});

export const initialState = fromJS({
  [CONNECTION]: false,
  [TICKER]: [],
  [TRADES]: [],
  [BOOK]: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {

    //    Set connection
    case SET_CONNECTION:
      return state.set(CONNECTION, action.payload);


    //    Set channel
    case SET_CHANNEL:
    console.log(action.payload);
      return state.set(action.payload.channel, action.payload.data);

    default:
      return state;
  }
}

export default homePageReducer;
