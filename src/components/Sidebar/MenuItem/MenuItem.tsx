import type { FC } from "react";
import classes from "./menuItem.module.scss";
import clsx from "clsx";

import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { logout, selectAuth } from "../../../store/authSlice";
import { type IconType } from "react-icons/lib";

import { useSelector } from "react-redux";

export interface IMenuItem {
  tilte: string;
  link: string;
  Icon: IconType;
  disabled?: boolean;
  removed?: boolean;
  disabledForBoth?: boolean
}

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, status } = useSelector(selectAuth);

  return (
    <li
      className={clsx({
        [classes.logout]: item.link === "/",
      })}
    >
      {item.disabled && user?.role == "STADION_OWNER" || item.disabledForBoth ? (
        <div className={classes.disabled}>
          {<item.Icon />}
          <p>{item.tilte}</p>
        </div>
      ) :
      <NavLink
        className={({ isActive }) =>
          clsx(
            classes.item,
            {
              [classes.active]:
                item.link === "/dashboard"
                  ? location.pathname.endsWith("dashboard")
                  : isActive,
            }
          )
        }
        onClick={() => {
          if (item.link === "/admin/login") {
            dispatch(logout());
          }
        }}
        to={item.link}
      >
        {<item.Icon />}
        <p>{item.tilte}</p>
      </NavLink>}
    </li>
  );
};

export default MenuItem;
