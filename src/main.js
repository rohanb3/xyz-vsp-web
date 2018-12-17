import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueHotKey from 'v-hotkey';
import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  primary: '#3c91f7',
});

Vue.use(VueHotKey);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
