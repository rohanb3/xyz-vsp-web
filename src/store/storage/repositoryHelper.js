import { getCalls } from '@/services/callRepository';
import { getDevices } from '@/services/devicesRepository';
import { ENTITY_TYPES } from '@/constants';

const { CALLS, DEVICES } = ENTITY_TYPES;

const handlers = {
  [CALLS]: {
    getAll: getCalls,
  },
  [DEVICES]: {
    getAll: getDevices,
  },
};

const defaultHandler = itemType => () => {
  throw new Error(`Handler for ${itemType} type is not supported yet!`);
};

/* eslint-disable-next-line import/prefer-default-export */
export const getEntityActions = type => ({
  getAll: handlers[type].getAll || defaultHandler(type),
  create: handlers[type].create || defaultHandler(type),
  update: handlers[type].update || defaultHandler(type),
  delete: handlers[type].delete || defaultHandler(type),
});
