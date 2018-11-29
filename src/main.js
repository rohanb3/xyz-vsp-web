import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
