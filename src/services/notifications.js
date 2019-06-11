import i18n from '@/i18n';
import Vue from 'vue';

export const successMessage = (title, description = '') => {
  Vue.notify({
    group: 'notifications',
    title: i18n.t(title),
    text: i18n.t(description),
    type: 'success',
  });
};

export const warnMessage = (title, description = '') => {
  Vue.notify({
    group: 'notifications',
    title: i18n.t(title),
    text: i18n.t(description),
    type: 'warn',
  });
};

export const errorMessage = (title = 'something.went.wrong', description = '') => {
  Vue.notify({
    group: 'notifications',
    title: i18n.t(title),
    text: i18n.t(description),
    type: 'error',
  });
};
