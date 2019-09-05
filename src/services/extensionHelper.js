const INCOMING_CALL = 'incoming_call';

const sendMessageToExtesnion = () => {
  window.postMessage(INCOMING_CALL, window.location.origin);
};

export default sendMessageToExtesnion;
