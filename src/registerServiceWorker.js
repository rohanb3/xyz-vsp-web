/* eslint-disable no-console */

import { register } from 'register-service-worker';
import { setSWRegistration } from '@/services/callNotifications';

const serviceWorker = {
  ready(registration) {
    console.log(
      'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB',
      registration
    );

    setSWRegistration(registration);
  },
  registered(registration) {
    console.log('Service worker has been registered.', registration);
    setSWRegistration(registration);
  },
  cached() {
    console.log('Content has been cached for offline use.');
  },
  updated() {
    console.log('New content is available; please refresh.');
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.');
  },
  error(error) {
    console.error('Error during service worker registration:', error);
  },
};

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, serviceWorker);
}
