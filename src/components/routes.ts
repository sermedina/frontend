import { Route, Role, DecisionType } from './types';

import HomePage from './HomeEncargado';
import LoginPage from './Login';

export const routes: Route[] = [
  {
    path: '/',
    component: HomePage,
    title: 'Home Page',
    exact: true,
    acl: {
      [Role.GUEST]: {
        type: DecisionType.ALLOW,
      },
      [Role.USER]: {
        type: DecisionType.ALLOW,
      },
      [Role.ADMIN]: {
        type: DecisionType.ALLOW,
      },
    },
  },
  {
    path: '/login',
    component: LoginPage,
    title: 'Login Page',
    exact: true,
    acl: {
      [Role.GUEST]: {
        type: DecisionType.ALLOW,
      },
      [Role.USER]: {
        type: DecisionType.REDIRECT,
        meta: '/',
      },
      [Role.ADMIN]: {
        type: DecisionType.REDIRECT,
        meta: '/',
      },
    },
  },
];