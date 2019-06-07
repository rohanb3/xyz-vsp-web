let listeners = [];

const hubConnection = {
  start: jest.fn(() => Promise.resolve(hubConnection)),
  stop: jest.fn(() => Promise.resolve(hubConnection)),
  invoke: jest.fn(() => Promise.resolve(hubConnection)),
  on: jest.fn(() => Promise.resolve(hubConnection)),
};

const hubConnectionBuilder = {
  withUrl: jest.fn(() => hubConnectionBuilder),
  configureLogging: jest.fn(() => hubConnectionBuilder),
  build: jest.fn(() => hubConnection),
};

class HubConnectionBuilder {
  constructor() {
    return hubConnectionBuilder;
  }
}

class HttpTransportType {
  static get WebSockets() {}
}

class LogLevel {
  static get Information() {}
}

export {
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
  hubConnection,
  hubConnectionBuilder,
};
