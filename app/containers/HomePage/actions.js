/*
 *
 * HomePage actions
 *
 */
import { SET_CONNECTION, SET_CHANNEL } from './constants';

export function setConnection(payload) {
  return {
    type: SET_CONNECTION,
    payload,
  };
}

export function setChannel(channel, data) {
  return {
    type: SET_CHANNEL,
    payload: { channel, data },
  };
}
