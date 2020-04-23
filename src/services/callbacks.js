// eslint-disable-next-line import/prefer-default-export
export const isCallbackPending = callback =>
  callback.requestedAt && !callback.acceptedAt && !callback.missedAt && !callback.declinedAt;
