import { useEffect, type FC, useState } from "react";
import classes from "./sidebar.module.scss";

import MenuItem, { type IMenuItem } from "./MenuItem/MenuItem";

import { MdSpaceDashboard, MdCalendarMonth } from "react-icons/md";
import { GiSoccerBall, GiSoccerField } from "react-icons/gi";
import { CiLogout, CiUser } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import axios, { BASE_URL } from "../../axios/axios";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

const MENU: IMenuItem[] = [
  {
    tilte: "Dashboard",
    link: "/dashboard",
    Icon: MdSpaceDashboard,
  },
  {
    tilte: "Calendar",
    link: "/dashboard/calendar",
    Icon: MdCalendarMonth,
  },
  {
    tilte: "Games",
    link: "/dashboard/games",
    Icon: GiSoccerBall,
  },
  {
    tilte: "Stadions",
    link: "/dashboard/stadions",
    Icon: GiSoccerField,
  },
  {
    tilte: "Facilities",
    link: "/dashboard/facilities",
    Icon: GiSoccerField,
  },
  {
    tilte: "Users",
    link: "/dashboard/users",
    Icon: CiUser,
  },
  {
    tilte: "Logout",
    link: "/",
    Icon: CiLogout,
  },
];

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const Sidebar: FC = () => {
  const { user, status } = useSelector(selectAuth);
  const { data: count } = useSWR("/stadion/getNewNotificationsCount", fetcher);

  return (
    <aside className={classes.sidebar}>
      <ul className={classes.menu}>
        {user?.role == "STADION_OWNER" && (
          <NavLink to={"/dashboard/notifications"}>
            <div className={classes.notification}>
              {count > 0 && <div className={classes.number}>{count}</div>}
            </div>
          </NavLink>
        )}
        {MENU.map((item) => {
          return <MenuItem key={item.tilte} item={item} />;
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
