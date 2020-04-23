import api from '@/services/realtimeDashboardApi';
import { paramsSerializer } from '@/services/repositoryUtils';
/* eslint-disable-next-line import/prefer-default-export */
export const getDurations = filters => {
  const params = { ...filters };
  return api.get('/durations', { params, paramsSerializer });
};

export const getCallbacks = filters => {
  const params = { ...filters };
  return api.get('/callbacks', { params, paramsSerializer });
};
