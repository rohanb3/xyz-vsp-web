import api from '@/services/realtimeDashboardApi';
import { paramsSerializer } from '@/services/repositoryUtils';
/* eslint-disable-next-line import/prefer-default-export */
export const getDurations = filters => {
  const params = { ...filters };
  return api.get('/durations', { params, paramsSerializer }).then(
    ({ data }) => ({ data })
    // return {data: {
    //   _id: null,
    //   total: 8,
    //   maxCallDuration: 125,
    //   averageCallDuration: 36,
    //   totalCallDuration: 288,
    //   maxWaitingDuration: 49,
    //   averageWaitingDuration: 11.625,
    //   totalWaitingDuration: 93,
    // }};
  );
};
