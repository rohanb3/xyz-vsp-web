// jest.mock('@aspnet/signalr');
import * as deviceManagementSocket from '@/services/deviceManagementSocket';
import { hubConnection, hubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';

describe('deviceManagementSocket: ', () => {
  describe('initialization: ', () => {
    it('should set url and options', () => {
      const expectedUrl = '/api/device-management-api/operatorSocket';
      const expectedOptons = {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      };
      expect(hubConnectionBuilder.withUrl).toHaveBeenCalledWith(expectedUrl, expectedOptons);
    });

    it('should configure log level', () => {
      expect(hubConnectionBuilder.configureLogging).toHaveBeenCalledWith(LogLevel.Information);
    });

    it('should build connection', () => {
      expect(hubConnectionBuilder.build).toHaveBeenCalled();
    });
  });

  describe('connect(): ', () => {
    it('should start connection and register updates listener', () => {
      const onDeviceUpdated = jest.fn();
      return deviceManagementSocket.connect(onDeviceUpdated).then(() => {
        const registeredListener = hubConnection.on.mock.calls[0][1];
        registeredListener();
        expect(hubConnection.start).toHaveBeenCalled();
        expect(hubConnection.on).toHaveBeenCalledWith('DeviceUpdated', expect.any(Function));
        expect(onDeviceUpdated).toHaveBeenCalled();
      });
    });
  });

  describe('subscribeToDeviceChanges(): ', () => {
    it('should invoke correct method with correct params', () => {
      const ids = ['1', '2', '42'];
      const expectedParams = { Udids: ids };
      return deviceManagementSocket.subscribeToDeviceChanges(ids).then(() => {
        expect(hubConnection.invoke).toHaveBeenCalledWith(
          'SubscribeDevicesUpdates',
          expectedParams
        );
      });
    });
  });

  describe('unsubscribeFromDeviceChanges(): ', () => {
    it('should invoke correct methods with correct params', () => {
      const expectedParams = { Udids: [] };
      return deviceManagementSocket.unsubscribeFromDeviceChanges().then(() => {
        expect(hubConnection.invoke).toHaveBeenCalledWith(
          'SubscribeDevicesUpdates',
          expectedParams
        );
      });
    });
  });

  describe('pickNeededFields(): ', () => {
    it('should return only needed fields if json is correct', () => {
      const data = {
        device: {
          id: '42',
          unusedField: '777',
        },
        isOnline: true,
        isInLocation: false,
        oneMoreUnusedField: 'test',
      };
      const validJson = JSON.stringify(data);
      const expectedFields = {
        id: '42',
        isOnline: true,
        isInLocation: false,
      };
      expect(deviceManagementSocket.pickNeededFields(validJson)).toEqual(expectedFields);
    });
    it('should return empty object if invalid json was passed', () => {
      const invalidJson = '{ asdsdads }';
      expect(deviceManagementSocket.pickNeededFields(invalidJson)).toEqual({});
    });
  });
});