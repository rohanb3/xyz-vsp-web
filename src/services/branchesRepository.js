import api from './branchesApi';

/* eslint-disable-next-line import/prefer-default-export */
export const getBranchInfo = id => api.get(`/${id}`).then(({ data }) => data);
