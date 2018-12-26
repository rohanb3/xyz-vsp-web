import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/views/Base';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';
import Customers from '@/views/Customers';
import Calls from '@/views/Calls';
import SettingsPage from '@/views/SettingsPage';

import CallFeedbackPopup from '@/containers/CallFeedbackPopup';

import AppHeader from '@/containers/AppHeader';
import LHS from '@/containers/LHS';
import AppContent from '@/views/AppContent';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { unsafe: true },
      beforeEnter(to, from, next) {
        if (store.state.loggedInUser.user) {
          next({ name: 'customers' });
        } else {
          next();
        }
      },
    },
    {
      path: '',
      component: Base,
      children: [
        {
          path: '',
          components: {
            header: AppHeader,
            lhs: LHS,
            main: AppContent,
          },
          children: [
            {
              path: '/dashboard',
              name: 'dashboard',
              component: Dashboard,
            },
            {
              path: '/customers',
              name: 'customers',
              component: Customers,
            },
            {
              path: '/calls',
              name: 'calls',
              component: Calls,
            },
            {
              path: '/settings',
              name: 'settings',
              component: SettingsPage,
            },
            {
              path: '/feedback',
              name: 'feedback',
              component: CallFeedbackPopup,
            },
          ],
        },
      ],
    },
    { path: '*', redirect: { name: 'customers' } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.unsafe || store.state.loggedInUser.user) {
    next();
  } else {
    next({ name: 'login' });
  }
});

export default router;
