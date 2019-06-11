import { getCalls } from '@/services/callRepository';
import { getDevices, getDeviceHistory } from '@/services/devicesRepository';
import { getCompanies } from '@/services/publicApiRepository';
import { ENTITY_TYPES } from '@/constants';

const { CALLS, DEVICES, COMPANY_LIST, DEVICE_HISTORY } = ENTITY_TYPES;

const handlers = {
  [CALLS]: {
    getAll: getCalls,
  },
  [DEVICES]: {
    getAll: getDevices,
  },
  [DEVICE_HISTORY]: {
    getAll: getDeviceHistory,
  },
  [COMPANY_LIST]: {
    getAll: getCompanies,
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
