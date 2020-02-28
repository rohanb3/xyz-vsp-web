import Vue from 'vue';

import mutations from '@/store/storage/mutations';
import {
  INSERT_ITEMS,
  UPSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  CHANGE_ITEM,
  REMOVE_ITEM,
} from '@/store/storage/mutationTypes';
import { ENTITY_TYPES } from '@/constants';

xdescribe('storage mutations: ', () => {
  xdescribe('INSERT_ITEMS: ', () => {
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

  xdescribe('UPSERT_ITEMS: ', () => {
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

  xdescribe('RESET_ITEMS: ', () => {
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

  xdescribe('SET_ALL_ITEMS_LOADED: ', () => {
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

  xdescribe('CHANGE_ITEM: ', () => {
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

  xdescribe('REMOVE_ITEM: ', () => {
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
});
