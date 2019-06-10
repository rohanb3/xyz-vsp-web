// eslint-disable-next-line no-useless-escape
export const emailValidatorRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const RESPONSE_STATUSES = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  REQUEST_ENTITY_TOO_LARGE: 413,
};

export const SORTING_DIRECTION = {
  DESC: 'desc',
  ASC: 'asc',
};

export const ROUTE_NAMES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CALLS: 'calls',
  DASHBOARD: 'dashboard',
};

export const ENTITY_TYPES = {
  CALLS: 'calls',
  DEVICES: 'devices',
  DEVICE_HISTORY: 'deviceHistory',
  CUSTOMERS: 'customers',
  COMPANIES: 'companies',
  OPERATORS: 'operators',
  CALLS_DURATION: 'callsDuration',
  CALLS_FEEDBACK: 'callsFeedback',
  SUPERADMIN_OPERATORS: 'superAdminOperators',
  PAYMENTS: 'payments',
};

export const DATE_FORMATS = {
  DEFAULT_DATE_FORMAT: 'DD MMM YYYY, HH:mm',
  DEFAULT_TIME_FORMAT: 'hh:mm',
  DAY_FULL_MONTH: 'DD MMMM',
  FULL_YEAR_SHORT_MONTH_SHORT_DAY: 'YYYY-MM-DD',
  MONTH_ONLY: 'MMMM',
  SHORT_DAY_SHORT_MONTH_FULL_YEAR: 'DD MMM YYYY',
  SHORT_DAY_SHORT_MONTH_FULL_YEAR_REVERSE: 'MMM DD, YYYY',
};

export const DOM_EVENTS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  BEFORE_UNLOAD: 'beforeunload',
};

export const NOTIFICATIONS = {
  NOTIFICATION_DURATION: 3000,
};

export const USER_MEDIA_ERROR_MESSAGES = {
  USER_MEDIA_FAILED: 'user.media.failed',
};

export const PERMISSION_STATUSES = {
  NOT_REQUESTED: 'default',
  GRANTED: 'granted',
  DENIED: 'denied',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
};

export const PERMISSION_ERROR_MESSAGES = {
  PERMISSIONS_BLOCKED: 'permissions.blocked',
};

const EXTENSION_ID = process.env.EXTENSION_ID || 'bkhgjdfacdkkffgmjfndalaeelhjaiha';
export const TWILIO = {
  EXTENSION_ID,
  EXTENSION_URL: `https://chrome.google.com/webstore/detail/xyzies-vsp-screensharing/${EXTENSION_ID}`,
  AUDIO: 'audio',
  VIDEO: 'video',
};

const CONNECT = 'connect';
const DISCONNECT = 'disconnect';
const RECONNECT = 'reconnect';
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
const CALL_FINISED_BY_CUSTOMER = 'call.finished.by.customer';

const PEER_OFFLINE = 'peer.offline';
const PEER_BUSY = 'peer.busy';

const ALREADY_LOGGED_IN = 'already.logged.in';

export const OPERATOR_SOCKET = {
  EVENTS: {
    CONNECT,
    DISCONNECT,
    RECONNECT,
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
  },
  ERROR_MESSAGES: {
    CALLS_EMPTY,
    CALL_ACCEPTING_FAILED,
    PEER_OFFLINE,
    PEER_BUSY,
    ALREADY_LOGGED_IN,
    CALL_FINISED_BY_CUSTOMER,
  },
  NAMESPACE: process.env.VUE_APP_OPERATOR_WS_NAMESPACE || '/operators',
  CONNECTION_OPTIONS: {
    transports: ['websocket'],
    path: '/api/video/socket.io',
  },
};

export const ROLE_TYPES = {
  SUPER_ADMIN: 'superadmin',
  OPERATION_ADMIN: 'operationadmin',
  SYSTEM_ADMIN: 'systemadmin',
  ACCOUNT_ADMIN: 'accountadmin',
  SUPPORT_ADMIN: 'supportadmin',
  SALES_REP: 'salesrep',
};

export const DEVICE_DETAILS_TABS = ['details', 'history', 'comments'];
