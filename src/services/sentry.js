import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import moment from 'moment';

export function init() {
  Sentry.init({
    dsn: 'https://37e26f89eb3d4443ab5a7f8f78017656@sentry.io/1470572',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
      }),
    ],
  });
}

export function log(...args) {
  const now = moment().format();
  const app = 'WEB';
  const message = [now, app, ...args].map(item => `[${JSON.stringify(item)}]`).join(' ');
  Sentry.captureMessage(message, Sentry.Severity.Info);
}
