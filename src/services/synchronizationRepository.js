import api from '@/services/synchronizationApi';

const lastSyncTime = () => api.get('migrations/last-sync-time').then(({ data }) => data.time);

const migrateUsers = params =>
  api.get('migrations/users/cp-to-azure', { params }).then(response => response);

export { lastSyncTime, migrateUsers };
