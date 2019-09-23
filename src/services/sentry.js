import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import moment from 'moment';

export function init() {
  const url = process.env.SENTRY_URL;

  if (!url) {
    return;
  }

  Sentry.init({
    dsn: url,
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
