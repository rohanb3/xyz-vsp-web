import Vue from 'vue';
import i18n from '@/i18n';
import { listenToCallInterruption } from '@/services/operatorSocket';
import { NOTIFICATIONS } from '@/constants';

export default function trackCallInterruption(interruptCall) {
  return listenToCallInterruption(() => {
    interruptCall();
    notifyAboutCallInterrupted();
  });
}

function notifyAboutCallInterrupted() {
  const title = i18n.t('incoming.call.popup.call.was.answered');
  Vue.notify({
    group: 'notifications',
    title,
    type: 'error',
    duration: NOTIFICATIONS.NOTIFICATION_DURATION,
  });
}
