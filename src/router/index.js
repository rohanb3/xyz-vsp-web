import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import CustomersList from '@/views/CustomersList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersList,
    },
  ],
});
