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

import identityApi from '@/services/identityApi';
import applyAuthInterceptors from '@/services/authInterceptors';

import store from '@/store';

Vue.use(Router);

function loginGuard(to, from, next) {
  if (store.state.loggedInUser.token) {
    next({ path: 'dashboard' });
  } else {
    next();
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { unsafe: true },
      beforeEnter: loginGuard,
    },
    {
      path: '/',
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
              beforeEnter(to, from, next) {
                if (store.getters.isOperatorOnCall) {
                  next();
                } else {
                  next({ name: 'calls' });
                }
              },
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
    { path: '*', redirect: { name: 'calls' } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.unsafe || store.state.loggedInUser.token) {
    next();
  } else {
    next({ name: 'login' });
  }
});

applyAuthInterceptors(identityApi, router);

export default router;
