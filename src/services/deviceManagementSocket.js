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
      hubConnection.on(DEVICE_UPDATED, updates => onDeviceUpdated(pickNeededFields(updates)));
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

// only for tests
export function pickNeededFields(updatesRaw) {
  let updates = null;
  try {
    const {
      device: { id, latitude: deviceLocationLatitude, longitude: deviceLocationLongitude },
      isOnline,
      isInLocation,
      createdOn,
      currentDeviceLocationLatitude,
      currentDeviceLocationLongitude,
    } = JSON.parse(updatesRaw);
    updates = {
      id,
      isOnline,
      isInLocation,
      createdOn,
      statusSince: createdOn,
      currentDeviceLocationLatitude,
      currentDeviceLocationLongitude,
      deviceLocationLatitude,
      deviceLocationLongitude,
    };
  } catch (e) {
    updates = {};
  }

  return updates;
}
