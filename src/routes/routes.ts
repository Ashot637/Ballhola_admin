import type { FC } from 'react';

import LoginPage from '../pages/LoginPage/LoginPage';

import DashboardLayout from '../pages/DashboardLayout/DashboardLayout';
import Dashboard from '../pages/DashboardLayout/Dashboard/Dashboard';
import Games from '../pages/DashboardLayout/Games/Games';
import NewGame from '../pages/DashboardLayout/Games/NewGame/NewGame';
import Users from '../pages/DashboardLayout/Users/Users';
import Stadions from '../pages/DashboardLayout/Stadions/Stadions';
import NewStadion from '../pages/DashboardLayout/Stadions/NewStadion/NewStadion';
import Facilities from '../pages/DashboardLayout/Facilities/Facilities';
import NewFacilitie from '../pages/DashboardLayout/Facilities/NewFacilitie/NewFacilitie';
import SingleUser from '../pages/DashboardLayout/Users/SingleUser/SingleUser';

export interface IRoute {
  path: string;
  Element: FC;
  children?: IRoute[];
}

export const publicRoutes: IRoute[] = [
  {
    path: '/',
    Element: LoginPage,
  },
];

export const adminRoutes: IRoute[] = [
  {
    path: 'dashboard',
    Element: DashboardLayout,
    children: [
      {
        path: '',
        Element: Dashboard,
      },
      {
        path: 'games',
        Element: Games,
      },
      {
        path: 'games/:id/edit',
        Element: NewGame,
      },
      {
        path: 'games/new',
        Element: NewGame,
      },
      {
        path: 'stadions',
        Element: Stadions,
      },
      {
        path: 'stadions/:id/edit',
        Element: NewStadion,
      },
      {
        path: 'stadions/new',
        Element: NewStadion,
      },
      {
        path: 'facilities',
        Element: Facilities,
      },
      {
        path: 'facilities/:id/edit',
        Element: NewFacilitie,
      },
      {
        path: 'facilities/new',
        Element: NewFacilitie,
      },
      {
        path: 'users',
        Element: Users,
      },
      {
        path: 'users/:id',
        Element: SingleUser,
      },
    ],
  },
];
