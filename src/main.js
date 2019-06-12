import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueHotKey from 'v-hotkey';
import Notifications from 'vue-notification';
import 'vue-popperjs/dist/css/vue-popper.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n';
import './datepicker';
import '@/registerServiceWorker';
import { init as listenNetworkStatusChange } from '@/services/networkStatus';
import { init as initSentry } from '@/services/sentry';

initSentry();

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#3c91f7',
    success: '#7ed321',
  },
});

Vue.use(Notifications);

Vue.use(VueHotKey);

listenNetworkStatusChange(store);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
