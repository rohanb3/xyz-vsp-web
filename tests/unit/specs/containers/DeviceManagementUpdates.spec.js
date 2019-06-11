import DeviceManagementUpdates from '@/containers/DeviceManagementUpdates';
import { ENTITY_TYPES } from '@/constants';
import * as deviceManagementSocket from '@/services/deviceManagementSocket';
import { CHANGE_ITEM, UPSERT_ITEMS } from '@/store/storage/mutationTypes';

jest.mock('@/services/deviceManagementSocket');

describe('DeviceManagementUpdates', () => {
  describe('mounted() ', () => {
    it('should connect to device management socket on mounting', () => {
      const fakeThis = {
        updateDevice: () => {},
      };

      deviceManagementSocket.connect = jest.fn();

      DeviceManagementUpdates.mounted.call(fakeThis);

      expect(deviceManagementSocket.connect).toHaveBeenCalledWith(fakeThis.updateDevice);
    });
  });

  describe('computed: ', () => {
    describe('devicesUdids(): ', () => {
      it('should return array of device udids', () => {
        const fakeThis = {
          devices: [{ udid: 1 }, { udid: 2 }, { udid: 3 }],
        };
        const expectedUdids = [1, 2, 3];

        const actualUdids = DeviceManagementUpdates.computed.devicesUdids.call(fakeThis);
        expect(actualUdids).toEqual(expectedUdids);
      });
    });

    describe('devicesTableData(): ', () => {
      it('should return correct table data from store', () => {
        const deviceHistoryTableData = {
          1: {},
          2: {},
        };
        const fakeThis = {
          $store: {
            state: {
              tables: {
                [ENTITY_TYPES.DEVICE_HISTORY]: deviceHistoryTableData,
              },
            },
          },
        };

        const actualData = DeviceManagementUpdates.computed.devicesTableData.call(fakeThis);
        expect(actualData).toEqual(deviceHistoryTableData);
      });
    });

    describe('selectedDeviceId(): ', () => {
      it('should return id from table data', () => {
        const deviceId = 'device42';
        const fakeThis = {
          devicesTableData: {
            filters: {
              deviceId,
            },
          },
        };

        const actualId = DeviceManagementUpdates.computed.selectedDeviceId.call(fakeThis);
        expect(actualId).toBe(deviceId);
      });
    });
  });

  describe('watch: ', () => {
    describe('devicesUdids(): ', () => {
      it('should subscribe to devices changes with udids', () => {
        const udids = [1, 2, 3];

        deviceManagementSocket.subscribeToDeviceChanges = jest.fn();

        DeviceManagementUpdates.watch.devicesUdids(udids);

        expect(deviceManagementSocket.subscribeToDeviceChanges).toHaveBeenCalledWith(udids);
      });
    });
  });

  describe('beforeDestroy(): ', () => {
    it('should unsubscribe from device changes and disconnect if it succeed', () => {
      deviceManagementSocket.disconnect = jest.fn();
      deviceManagementSocket.unsubscribeFromDeviceChanges = jest.fn(() => Promise.resolve());

      return DeviceManagementUpdates.beforeDestroy().then(() => {
        expect(deviceManagementSocket.unsubscribeFromDeviceChanges).toHaveBeenCalled();
        expect(deviceManagementSocket.disconnect).toHaveBeenCalled();
      });
    });

    it('should unsubscribe from device changes and disconnect if it failed', () => {
      deviceManagementSocket.disconnect = jest.fn();
      deviceManagementSocket.unsubscribeFromDeviceChanges = jest.fn(() => Promise.reject());

      return DeviceManagementUpdates.beforeDestroy().catch(() => {
        expect(deviceManagementSocket.unsubscribeFromDeviceChanges).toHaveBeenCalled();
        expect(deviceManagementSocket.disconnect).toHaveBeenCalled();
      });
    });
  });

  describe('methods: ', () => {
    describe('updateDevice(): ', () => {
      it('should commit to store device updates', () => {
        const fakeThis = {
          $store: {
            commit: jest.fn(),
          },
          selectedDeviceId: null,
        };

        const updates = {
          id: 'device42',
          isInLocation: true,
          isOnline: false,
        };

        const expectedPayload = {
          itemType: ENTITY_TYPES.DEVICES,
          ...updates,
        };

        DeviceManagementUpdates.methods.updateDevice.call(fakeThis, updates);

        expect(fakeThis.$store.commit).toHaveBeenCalledWith(CHANGE_ITEM, expectedPayload);
        expect(fakeThis.$store.commit).toHaveBeenCalledTimes(1);
      });

      it('should update device history if updated device is selected', () => {
        const deviceId = 'device42';
        const fakeThis = {
          $store: {
            commit: jest.fn(),
          },
          selectedDeviceId: deviceId,
        };

        const updates = {
          id: deviceId,
          isInLocation: true,
          isOnline: false,
          deviceCurrentLatitude: 42,
          deviceCurrentLongitude: 42,
        };

        const expectedItem = {
          isInLocation: true,
          isOnline: false,
          deviceCurrentLatitude: 42,
          deviceCurrentLongitude: 42,
        };

        const expectedPayload = {
          itemType: ENTITY_TYPES.DEVICE_HISTORY,
          items: [expectedItem],
        };

        DeviceManagementUpdates.methods.updateDevice.call(fakeThis, updates);

        expect(fakeThis.$store.commit).toHaveBeenCalledWith(UPSERT_ITEMS, expectedPayload);
      });
    });
  });
});
