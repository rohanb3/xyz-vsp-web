import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import moment from 'moment';

export function init() {
  Sentry.init({
    dsn: 'https://76f2311f29fd403b89b53c96c0b354ef@sentry.io/1454113',
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
  const message = [now, ...args].map(item => `[${JSON.stringify(item)}]`).join(' ');
  Sentry.captureMessage(message, Sentry.Severity.Info);
}
