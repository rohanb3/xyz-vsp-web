import { LOAD_CALLS_ANSWERED_DATA, LOAD_CALLS_MISSED_DATA } from './actionTypes';
import { INSERT_CALLS_ANSWERED_DATA, INSERT_CALLS_MISSED_DATA } from './mutationTypes';
import { getDurations } from '@/services/realtimeDashboardRepository';

async function loadCallsAnsweredData({ commit }, { filters = {} }) {
  const filtersToApply = {
    ...filters,
  };
  const { data } = await getDurations(filtersToApply);
  commit(INSERT_CALLS_ANSWERED_DATA, data);
}

async function loadCallsMissedData({ commit }, { filters = {} }) {
  const filtersToApply = {
    ...filters,
  };
  const { data } = await getDurations(filtersToApply);
  commit(INSERT_CALLS_MISSED_DATA, data);
}

export default {
  [LOAD_CALLS_ANSWERED_DATA]: loadCallsAnsweredData,
  [LOAD_CALLS_MISSED_DATA]: loadCallsMissedData,
};
