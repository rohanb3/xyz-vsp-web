import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';

const hubUrl = '/api/device-management-api/operatorSocket';
const SUBSCRIBE_DEVICES_UPDATES = 'SubscribeDevicesUpdates';
const DEVICE_UPDATED = 'DeviceUpdated';

const hubConnection = new HubConnectionBuilder()
  .withUrl(hubUrl, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .configureLogging(LogLevel.Information)
  .build();

export function connect(onDeviceUpdated = () => {}) {
  return hubConnection
    .start()
    .then(() => {
      hubConnection.on(DEVICE_UPDATED, updates => handleUpdates(updates, onDeviceUpdated));
    })
    .catch(e => console.error('Device management socket failed', e));
}

export function disconnect() {
  return hubConnection.stop();
}

export function subscribeToDeviceChanges(ids = []) {
  return hubConnection.invoke(SUBSCRIBE_DEVICES_UPDATES, { Udids: ids });
}

export function unsubscribeFromDeviceChanges() {
  return hubConnection.invoke(SUBSCRIBE_DEVICES_UPDATES, { Udids: [] });
}

function handleUpdates(updatesRaw, callback) {
  console.log(JSON.parse(updatesRaw));
  callback(pickOnlyNeededFields(updatesRaw));
}

function pickOnlyNeededFields(updatesRaw) {
  let updates = null;
  try {
    const {
      device: { id },
      isOnline,
      isInLocation,
    } = JSON.parse(updatesRaw);
    updates = {
      id,
      isOnline,
      isInLocation,
    };
  } catch (e) {
    updates = {};
  }

  return updates;
}
