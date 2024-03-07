import type { FC } from 'react';

import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

import { Navigate } from 'react-router-dom';

import { STATUS } from '../../types/Status';

import LoginForm from './LoginForm/LoginForm';
import Spinner from '../../UI/Spinner/Spinner';

const LoginPage: FC = () => {
  const { user, status } = useSelector(selectAuth);

  if (
    (status === STATUS.LOADING || status === STATUS.WAITING) &&
    localStorage.getItem('accessToken')
  ) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={'/dashboard'} replace={true} />;
  }

  return (
    <div className="h-max flex align-center jst-center">
      <LoginForm />;
    </div>
  );
};

export default LoginPage;
