import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueHotKey from 'v-hotkey';
import 'vue-popperjs/dist/css/vue-popper.css';

import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n';
import './datepicker';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#3c91f7',
    success: '#7ed321',
  },
});

Vue.use(VueHotKey);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
