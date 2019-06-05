import { HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';

const hubUrl = '/deviceSocket';
const hubConnection = new HubConnectionBuilder()
  .withUrl(hubUrl, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .configureLogging(LogLevel.Information)
  .build();

hubConnection.on('Send', data => {
  console.log('Send', data);
});

setTimeout(() => {
  hubConnection.invoke('Send', [1, 2, 3]);
}, 2000);

hubConnection.start();

export function subscribeToDeviceChnages(ids = []) {
  console.log('Subscribe', ids);
}

export function unsubscribeFromDeviceChanges(ids = []) {
  console.log('Unsubscribe', ids);
}
