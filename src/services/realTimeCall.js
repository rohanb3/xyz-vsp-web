/* eslint-disable no-use-before-define, import/prefer-default-export */

// import store from '@/store';

// import { operatorStatuses } from '@/store/call/constants';
import {
  notifyAboutRealtimeDashboardSubscribe,
  notifyAboutRealtimeDashboardUnsubscribe,
  // realtimeDashboardSubscribed,
  // realtimeDashboardSubscribtionError,
  listenRealtimeDashboardWaitingCallsChanged,
} from '@/services/operatorSocket';

export function initRealTimeCalls() {
  console.log('xn13. >>> initRealTimeCalls');
  return notifyAboutRealtimeDashboardSubscribe().then(listenRealtimeDashboardWaitingCallsChanged);
  // .then(data => {
  //   console.log(
  //     'xn13. >>> notifyAboutRealtimeDashboardSubscribe > listenRealtimeDashboardWaitingCallsChanged > data:',
  //     data
  //   );
  // });
}

export function clearRealTimeCalls() {
  // console.log('xn13. >>> clearRealTimeCalls');
  return notifyAboutRealtimeDashboardUnsubscribe().then(data => {
    console.log('xn13. >>> notifyAboutRealtimeDashboardUnsubscribe > data:', data);
  });
}
