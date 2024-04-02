import { lazy, type FC } from "react";

import LoginPage from "../pages/LoginPage/LoginPage";
import NewMatch from "../pages/DashboardLayout/Calendar/NewMatch/NewMatch";
import MatchDetails from "../pages/DashboardLayout/Calendar/MatchDetails/MatchDetails";
import Notifications from '../pages/DashboardLayout/Notificatons/Notifications';


const DashboardLayout = lazy(
  () => import("../pages/DashboardLayout/DashboardLayout")
);
const Dashboard = lazy(
  () => import("../pages/DashboardLayout/Dashboard/Dashboard")
);
const Calendar = lazy(
  () => import("../pages/DashboardLayout/Calendar/Calendar")
);
const Games = lazy(() => import("../pages/DashboardLayout/Games/Games"));
const NewGame = lazy(
  () => import("../pages/DashboardLayout/Games/NewGame/NewGame")
);
const Users = lazy(() => import("../pages/DashboardLayout/Users/Users"));
const Stadions = lazy(
  () => import("../pages/DashboardLayout/Stadions/Stadions")
);
const NewStadion = lazy(
  () => import("../pages/DashboardLayout/Stadions/NewStadion/NewStadion")
);
const Facilities = lazy(
  () => import("../pages/DashboardLayout/Facilities/Facilities")
);
const NewFacilitie = lazy(
  () => import("../pages/DashboardLayout/Facilities/NewFacilitie/NewFacilitie")
);
const SingleUser = lazy(
  () => import("../pages/DashboardLayout/Users/SingleUser/SingleUser")
);

export interface IRoute {
  path: string;
  Element: FC;
  children?: IRoute[];
}

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    Element: LoginPage,
  },
];

export const adminRoutes: IRoute[] = [
  {
    path: "dashboard",
    Element: DashboardLayout,
    children: [
      {
        path: "",
        Element: Dashboard,
      },
      {
        path: "notifications",
        Element: Notifications,
      },
      {
        path: "games",
        Element: Games,
      },
      {
        path: "calendar",
        Element: Calendar,
      },
      {
        path: "calendar/:id/details",
        Element: MatchDetails,
      },
      {
        path: "games/:id/edit",
        Element: NewGame,
      },
      {
        path: "games/new",
        Element: NewGame,
      },
      {
        path: "stadions",
        Element: Stadions,
      },
      {
        path: "stadions/:id/edit",
        Element: NewStadion,
      },
      {
        path: "stadions/new",
        Element: NewStadion,
      },
      {
        path: "facilities",
        Element: Facilities,
      },
      {
        path: "facilities/:id/edit",
        Element: NewFacilitie,
      },
      {
        path: "facilities/new",
        Element: NewFacilitie,
      },
      {
        path: "users",
        Element: Users,
      },
      {
        path: "users/:id",
        Element: SingleUser,
      },
    ],
  },
];
