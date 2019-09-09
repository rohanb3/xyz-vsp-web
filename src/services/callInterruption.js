import Vue from 'vue';
import i18n from '@/i18n';
import router from '@/router';
import { listenToCallInterruption } from '@/services/operatorSocket';
import { NOTIFICATIONS } from '@/constants';

export default function trackCallInterruption(interruptCall) {
  return listenToCallInterruption(() => {
    interruptCall();
    router.go(-1);
    notifyAboutCallInterrupted();
  });
}

function notifyAboutCallInterrupted() {
  const title = i18n.t('incoming.call.popup.call.was.interrupted');
  Vue.notify({
    group: 'notifications',
    title,
    type: 'error',
    duration: NOTIFICATIONS.NOTIFICATION_DURATION,
  });
}
