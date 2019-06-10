import callsApi from '@/services/callsApi';

export const getCalls = filters => {
  const params = { ...filters };
  return callsApi.get('/calls', { params }).then(({ data }) => data);
};

export const getCallsTypes = () =>
  Promise.resovle({
    callTypes: ['info', 'help', 'sale'],
    dispositions: ['Long Name', 'Another Name', 'One more'],
  });

export const saveFeedback = data =>
  callsApi.post('/call-feedback-operator', data).then(response => response.data);
