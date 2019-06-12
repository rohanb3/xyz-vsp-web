import { getCalls } from '@/services/callRepository';
import { getDevices, getCommentByDevice } from '@/services/devicesRepository';
import { getCompanies } from '@/services/publicApiRepository';
import { ENTITY_TYPES } from '@/constants';

const { CALLS, DEVICES, DEVICE_COMMENTS, COMPANY_LIST } = ENTITY_TYPES;

const handlers = {
  [CALLS]: {
    getAll: getCalls,
  },
  [DEVICES]: {
    getAll: getDevices,
  },
  [COMPANY_LIST]: {
    getAll: getCompanies,
  },
  [DEVICE_COMMENTS]: {
    getAll: getCommentByDevice,
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
