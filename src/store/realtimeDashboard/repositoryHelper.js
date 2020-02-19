import { getDurations } from '@/services/realtimeDashboardRepository';

const handlers = {
  responseTimeDurations: {
    getAll: getDurations,
  },
};

const defaultHandler = itemType => () => {
  throw new Error(`Handler for ${itemType} type is not supported yet!`);
};

/* eslint-disable-next-line import/prefer-default-export */
export const getEntityActions = type => ({
  getAll: handlers[type].getAll || defaultHandler(type),
});
