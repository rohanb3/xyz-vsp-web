const IDLE = 'IDLE';
const INCOMING = 'INCOMING';
const CONNECTING = 'CONNECTING';
const ACTIVE = 'ACTIVE';
const FINISHED = 'FINISHED';
const CONNECTING_TO_CALL = 'CONNECTING_TO_CALL';
const ON_CALL = 'ON_CALL';
const FINISHED_CALL = 'FINISHED_CALL';

/* eslint-disable-next-line import/prefer-default-export */
export const callStatuses = {
  IDLE,
  INCOMING,
  CONNECTING,
  ACTIVE,
  FINISHED,
};
export const operatorStatuses = {
  IDLE,
  CONNECTING_TO_CALL,
  ON_CALL,
  FINISHED_CALL,
};
