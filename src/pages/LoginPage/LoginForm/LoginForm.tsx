import { type FormEvent, useState } from 'react';
import classes from './loginForm.module.scss';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { fetchLogin, selectAuth } from '../../../store/authSlice';

import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner';
import { STATUS } from '../../../types/Status';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { user, status } = useSelector(selectAuth);

  const dispatch = useAppDispatch();
  const { isInvalid } = useSelector(selectAuth);
  const [phone, setPhone] = useState<string>('');
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(fetchLogin({ password, phone }));
    navigate('/admin/dashboard/games')
    setPassword('');
    setPhone('');
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <h2 style={{color: "white", textAlign: 'center'}}>Log in</h2>
      <Input type="text" value={phone} onChange={setPhone} label="Phone" />
      <Input type="password" value={password} onChange={setPassword} label="Password" />
      <p className={classes.error}>{isInvalid && 'Invalid email or password'}</p>
      <Button type="submit" disabled={password.length < 6 || phone.length <= 8} value="Log in" />
    </form>
  );
};

export default LoginForm;
