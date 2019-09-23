const INCOMING_CALL = 'incoming_call';

const notifyAboutIncomingCall = () => {
  window.postMessage(INCOMING_CALL, window.location.origin);
};

export default notifyAboutIncomingCall;
