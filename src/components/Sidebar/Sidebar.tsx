import { type FC } from 'react';
import classes from './sidebar.module.scss';

import MenuItem, { type IMenuItem } from './MenuItem/MenuItem';

import { MdSpaceDashboard, MdCalendarMonth } from 'react-icons/md';
import { GiSoccerBall, GiSoccerField } from 'react-icons/gi';
import { CiLogout, CiUser } from 'react-icons/ci';

const MENU: IMenuItem[] = [
  {
    tilte: 'Dashboard',
    link: '/dashboard',
    Icon: MdSpaceDashboard,
  },
  {
    tilte: 'Calendar',
    link: '/dashboard/calendar',
    Icon: MdCalendarMonth,
  },
  {
    tilte: 'Games',
    link: '/dashboard/games',
    Icon: GiSoccerBall,
  },
  {
    tilte: 'Stadions',
    link: '/dashboard/stadions',
    Icon: GiSoccerField,
  },
  {
    tilte: 'Facilities',
    link: '/dashboard/facilities',
    Icon: GiSoccerField,
  },
  {
    tilte: 'Users',
    link: '/dashboard/users',
    Icon: CiUser,
  },
  {
    tilte: 'Logout',
    link: '/',
    Icon: CiLogout,
  },
];

const Sidebar: FC = () => {
  return (
    <aside className={classes.sidebar}>
      <ul className={classes.menu}>
        {MENU.map((item) => {
          return <MenuItem key={item.tilte} item={item} />;
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
