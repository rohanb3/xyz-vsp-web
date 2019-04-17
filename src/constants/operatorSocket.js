const CONNECT = 'connect';
const AUTHENTICATION = 'authentication';
const AUTHENTICATED = 'authenticated';
const UNAUTHORIZED = 'unauthorized';
const CALL_ACCEPTED = 'call.accepted';
const CALL_FINISHED = 'call.finished';
const CALLBACK_REQUESTED = 'callback.requested';
const CALLBACK_REQUESTING_FAILED = 'callback.requesting.failed';
const CALLBACK_ACCEPTED = 'callback.accepted';
const CALLBACK_DECLINED = 'callback.declined';
const CALLS_CHANGED = 'calls.changed';
const ROOM_LEFT_EMPTY = 'room.left.empty';
const ROOM_CREATED = 'room.created';
const STATUS_CHANGED_ONLINE = 'status.changed.online';
const STATUS_CHANGED_OFFLINE = 'status.changed.offline';
const CALLS_EMPTY = 'calls.empty';
const CALL_ACCEPTING_FAILED = 'call.accepting.failed';

const PEER_OFFLINE = 'peer.offline';
const PEER_BUSY = 'peer.busy';

const connectionOptions = {
  transports: ['websocket'],
  path: '/api/video/socket.io',
};

const events = {
  CONNECT,
  AUTHENTICATION,
  AUTHENTICATED,
  UNAUTHORIZED,
  CALL_ACCEPTED,
  CALL_FINISHED,
  CALLBACK_REQUESTED,
  CALLBACK_ACCEPTED,
  CALLBACK_DECLINED,
  CALLBACK_REQUESTING_FAILED,
  CALLS_CHANGED,
  CALLS_EMPTY,
  CALL_ACCEPTING_FAILED,
  ROOM_LEFT_EMPTY,
  ROOM_CREATED,
  STATUS_CHANGED_ONLINE,
  STATUS_CHANGED_OFFLINE,
};

const errorMessages = {
  CALLS_EMPTY,
  CALL_ACCEPTING_FAILED,
  PEER_OFFLINE,
  PEER_BUSY,
};

const namespace = process.env.VUE_APP_OPERATOR_WS_NAMESPACE || '/operators';

export { connectionOptions, events, namespace, errorMessages };
