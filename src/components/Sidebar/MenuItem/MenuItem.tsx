import type { FC } from 'react';
import classes from './menuItem.module.scss';
import clsx from 'clsx';

import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { logout } from '../../../store/authSlice';
import { type IconType } from 'react-icons/lib';

export interface IMenuItem {
  tilte: string;
  link: string;
  Icon: IconType;
}

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <li
      className={clsx({
        [classes.logout]: item.link === '/',
      })}>
      <NavLink
        className={({ isActive }) =>
          clsx(classes.item, {
            [classes.active]:
              item.link === '/dashboard' ? location.pathname.endsWith('dashboard') : isActive,
          })
        }
        onClick={() => {
          if (item.link === '/') {
            dispatch(logout());
          }
        }}
        to={item.link}>
        {<item.Icon />}
        <p>{item.tilte}</p>
      </NavLink>
    </li>
  );
};

export default MenuItem;
