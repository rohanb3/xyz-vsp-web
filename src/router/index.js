import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/views/Base';
import Login from '@/views/Login';
import AppContent from '@/views/AppContent';
import Dashboard from '@/views/Dashboard';
import Customers from '@/views/Customers';
import Calls from '@/views/Calls';
import SettingsPage from '@/views/SettingsPage';
import Call from '@/views/Call';

import AppHeader from '@/containers/AppHeader';
import LHS from '@/containers/LHS';
import IncomingCall from '@/containers/IncomingCall';

import store from '@/store';
import { callStatuses } from '@/store/call/constants';

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
            incomingCall: IncomingCall,
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
              path: '/call',
              name: 'call',
              component: Call,
              beforeEnter: (to, from, next) => {
                if (store.state.call.callStatus === callStatuses.ACCEPTED) {
                  next();
                } else {
                  next({ name: 'calls' });
                }
              },
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
