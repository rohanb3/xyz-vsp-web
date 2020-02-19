import { getDurations } from '@/services/realtimeDashboardRepository';
import { ENTITY_TYPES } from '@/constants';

const { CALL_STATISTICS_ANSWERED, CALL_STATISTICS_ABANDONED } = ENTITY_TYPES;

const handlers = {
  [CALL_STATISTICS_ANSWERED]: {
    getAll: getDurations,
  },
  [CALL_STATISTICS_ABANDONED]: {
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
