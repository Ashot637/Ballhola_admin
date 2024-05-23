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
    disabledForBoth: true
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
    tilte: "Stadiums",
    link: "/dashboard/stadiums",
    Icon: GiSoccerField,
    disabled: true
  },
  {
    tilte: "Facilities",
    link: "/dashboard/facilities",
    Icon: GiSoccerField,
    disabled: true
  },
  {
    tilte: "Users",
    link: "/dashboard/users",
    Icon: CiUser,
    removed: true,
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
        {user?.role == "STADION_OWNER"
          ? MENU.filter((i) => !i.removed).map(
              (item) => {
                return <MenuItem key={item.tilte} item={item} />;
              }
            )
          : MENU.map((item) => {
              return <MenuItem key={item.tilte} item={item} />;
            })}
      </ul>
    </aside>
  );
};

export default Sidebar;
