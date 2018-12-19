import api from './api';

export const getProfileData = () => api.get('/profile').then(response => response.data);
export const changeProfileData = data => api.post('/profile', data).then(response => response.data);
