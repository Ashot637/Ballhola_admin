import type { FC } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { selectAuth } from '../store/authSlice';
import { useSelector } from 'react-redux';

import { STATUS } from '../types/Status';

import Spinner from '../UI/Spinner/Spinner';

const ProtectedRoute: FC = () => {
  const { user, status } = useSelector(selectAuth);

  if (!localStorage.getItem('accessToken')) {
    return <Navigate to="/" replace={true} />;
  }

  if (status === STATUS.LOADING || status === STATUS.WAITING) {
    return <Spinner />;
  }

  return <>{user ? <Outlet /> : <Navigate to="/" replace={true} />}</>;
};

export default ProtectedRoute;
