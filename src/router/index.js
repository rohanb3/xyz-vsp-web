import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/views/Base';
import Login from '@/views/Login';
import AppContent from '@/views/AppContent';
import Dashboard from '@/views/Dashboard';
import Customers from '@/views/Customers';
import Calls from '@/views/Calls';
import OperatorReview from '@/views/OperatorReview';
import Payments from '@/views/Payments';
import SettingsPage from '@/views/SettingsPage';
import SupervisorSettings from '@/views/SupervisorSettings';
import SupervisorSettingsProfile from '@/views/SupervisorSettingsProfile';
import Operators from '@/views/Operators';
import CallPage from '@/views/CallPage';
import SupervisorDashboard from '@/views/SupervisorDashboard';
import OperatorDashboard from '@/views/OperatorDashboard';

import CallFeedbackPopup from '@/containers/CallFeedbackPopup';
import AppHeader from '@/containers/AppHeader';
import LHS from '@/containers/LHS';
import IncomingCallPopup from '@/containers/IncomingCallPopup';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/vsp/login',
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
      path: '/vsp',
      component: Base,
      children: [
        {
          path: '',
          components: {
            header: AppHeader,
            lhs: LHS,
            main: AppContent,
            incomingCall: IncomingCallPopup,
          },
          children: [
            {
              path: 'dashboard',
              name: 'dashboard',
              component: Dashboard,
            },
            {
              path: 'customers',
              name: 'customers',
              component: Customers,
            },
            {
              path: 'calls',
              name: 'calls',
              component: Calls,
            },
            {
              path: 'operators',
              name: 'operators',
              component: Operators,
            },
            {
              path: 'operator-review',
              name: 'operatorReview',
              component: OperatorReview,
            },
            {
              path: 'payments',
              name: 'payments',
              component: Payments,
            },
            {
              path: 'settings',
              name: 'settings',
              component: SettingsPage,
            },
            {
              path: 'supervisor-settings',
              name: 'supervisorSettings',
              component: SupervisorSettings,
              children: [
                {
                  path: 'profile',
                  name: 'supervisorSettingsProfile',
                  component: SupervisorSettingsProfile,
                },
                {
                  path: 'company',
                  name: 'supervisorSettingsCompany',
                  component: SupervisorSettingsProfile,
                },
                {
                  path: 'plans',
                  name: 'supervisorSettingsPlans',
                  component: SupervisorSettingsProfile,
                },
              ],
            },
            {
              path: 'feedback',
              name: 'feedback',
              component: CallFeedbackPopup,
            },
            {
              path: 'call',
              name: 'call',
              component: CallPage,
            },
            {
              path: 'supervisor-dashboard',
              name: 'supervisor-dashboard',
              component: SupervisorDashboard,
            },
            {
              path: 'operator-dashboard',
              name: 'operator-dashboard',
              component: OperatorDashboard,
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
