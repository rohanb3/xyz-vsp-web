import Vue from 'vue';

import mutations from '@/store/storage/mutations';
import {
  INSERT_ITEMS,
  UPSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_FULL_DEVICES_LIST,
  SET_TENANT_MINIFIED_USERS,
  SET_TENANT_MINIFIED_COMPANIES,
} from '@/store/storage/mutationTypes';
import { ENTITY_TYPES } from '@/constants';

describe('storage mutations: ', () => {
  describe('INSERT_ITEMS: ', () => {
    it('should insert items', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [{ id: 123 }],
        },
      };

      const expectedItems = [{ id: 123 }, { id: 321 }];

      mutations[INSERT_ITEMS](state, {
        itemType: ENTITY_TYPES.CALLS,
        items: [{ id: 321 }],
      });

      expect(state[ENTITY_TYPES.CALLS].items).toEqual(expectedItems);
    });
  });

  describe('UPSERT_ITEMS: ', () => {
    it('should upsert items', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [{ id: 321 }],
        },
      };

      const expectedItems = [{ id: 123 }, { id: 321 }];

      mutations[UPSERT_ITEMS](state, {
        itemType: ENTITY_TYPES.CALLS,
        items: [{ id: 123 }],
      });

      expect(state[ENTITY_TYPES.CALLS].items).toEqual(expectedItems);
    });
  });

  describe('RESET_ITEMS: ', () => {
    it('should reset items', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [{ id: 123 }],
          allItemsLoaded: true,
        },
      };

      mutations[RESET_ITEMS](state, ENTITY_TYPES.CALLS);

      expect(state[ENTITY_TYPES.CALLS].items).toEqual([]);
      expect(state[ENTITY_TYPES.CALLS].allItemsLoaded).toBeFalsy();
    });
  });

  describe('SET_ALL_ITEMS_LOADED: ', () => {
    it('should set items loaded', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          allItemsLoaded: false,
        },
      };

      mutations[SET_ALL_ITEMS_LOADED](state, ENTITY_TYPES.CALLS);

      expect(state[ENTITY_TYPES.CALLS].allItemsLoaded).toBeTruthy();
    });
  });

  describe('CHANGE_ITEM: ', () => {
    it('should change item', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const expectedItems = [
        { id: 1, description: 'Dear customer', title: 'Foxtrot' },
        { id: 2, description: 'Dear customer', title: 'Comfy' },
        {
          id: 3,
          description: 'We very happy',
          title: 'T-Mobile',
        },
      ];

      mutations[CHANGE_ITEM](state, {
        itemType: ENTITY_TYPES.CALLS,
        id: 2,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(state[ENTITY_TYPES.CALLS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const vueSpy = jest.spyOn(Vue, 'set');

      mutations[CHANGE_ITEM](state, {
        itemType: ENTITY_TYPES.CALLS,
        id: 10,
        description: 'Dear customer',
        title: 'Comfy',
      });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });

  describe('REMOVE_ITEM: ', () => {
    it('item should be deleted', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const expectedItems = [
        { id: 1, description: 'Dear customer', title: 'Foxtrot' },
        {
          id: 3,
          description: 'We very happy',
          title: 'T-Mobile',
        },
      ];

      mutations[REMOVE_ITEM](state, { itemType: ENTITY_TYPES.CALLS, id: 2 });

      expect(state[ENTITY_TYPES.CALLS].items).toEqual(expectedItems);
    });

    it('should not change data if item was not found', () => {
      const state = {
        [ENTITY_TYPES.CALLS]: {
          items: [
            { id: 1, description: 'Dear customer', title: 'Foxtrot' },
            { id: 2, description: 'Could you please rate', title: 'Nike' },
            {
              id: 3,
              description: 'We very happy',
              title: 'T-Mobile',
            },
          ],
        },
      };

      const vueSpy = jest.spyOn(Vue, 'delete');

      mutations[REMOVE_ITEM](state, { itemType: ENTITY_TYPES.CALLS, id: 20 });

      expect(vueSpy).not.toHaveBeenCalled();
    });
  });
  describe('SET_FULL_DEVICES_LIST: ', () => {
    it('should transform passed data to hash and save it', () => {
      const state = {};
      const devices = [
        { id: 1, udid: 1, deviceName: '1' },
        { id: 2, udid: 2, deviceName: '2' },
        { id: 3, udid: 3, deviceName: '3' },
      ];

      const expected = {
        1: { id: 1, udid: 1, deviceName: '1' },
        2: { id: 2, udid: 2, deviceName: '2' },
        3: { id: 3, udid: 3, deviceName: '3' },
      };

      mutations[SET_FULL_DEVICES_LIST](state, devices);

      expect(state.allDevices).toStrictEqual(expected);
    });
  });
  describe('SET_TENANT_MINIFIED_USERS: ', () => {
    it('should transform passed data to hash and save it', () => {
      const state = {};
      const users = [
        { id: 1, users: [{ objectId: 1, userName: '1' }] },
        { id: 2, users: [{ objectId: 2, userName: '2' }] },
        { id: 3, users: [{ objectId: 3, userName: '3' }] },
        { id: 4, users: [{ objectId: 4, userName: '4' }] },
      ];
      const expected = {
        1: {
          1: { objectId: 1, userName: '1' },
        },
        2: {
          2: { objectId: 2, userName: '2' },
        },
        3: {
          3: { objectId: 3, userName: '3' },
        },
        4: {
          4: { objectId: 4, userName: '4' },
        },
      };

      mutations[SET_TENANT_MINIFIED_USERS](state, users);

      expect(state.tenantUsers).toStrictEqual(expected);
    });
  });
  describe('SET_TENANT_MINIFIED_COMPANIES: ', () => {
    it('should transform passed data to hash and save it', () => {
      const state = {};
      const companies = [
        { id: 1, companies: [{ id: 1, companyName: '1' }] },
        { id: 2, companies: [{ id: 2, companyName: '2' }] },
        { id: 3, companies: [{ id: 3, companyName: '3' }] },
        { id: 4, companies: [{ id: 4, companyName: '4' }] },
      ];
      const expected = {
        1: {
          1: { id: 1, companyName: '1' },
        },
        2: {
          2: { id: 2, companyName: '2' },
        },
        3: {
          3: { id: 3, companyName: '3' },
        },
        4: {
          4: { id: 4, companyName: '4' },
        },
      };
      mutations[SET_TENANT_MINIFIED_COMPANIES](state, companies);

      expect(state.tenantCompanies).toStrictEqual(expected);
    });
  });
});
