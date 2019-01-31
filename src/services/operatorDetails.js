import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const getOperatorDetails = id => api.get(`/operator-details/${id}`).then(response => response.data);
