import { type FormEvent, useState } from 'react';
import classes from './loginForm.module.scss';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store/store';
import { fetchLogin, selectAuth } from '../../../store/authSlice';

import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isInvalid } = useSelector(selectAuth);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(fetchLogin({ password, phone }));
    setPassword('');
    setPhone('');
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Input type="text" value={phone} onChange={setPhone} label="Phone" />
      <Input type="password" value={password} onChange={setPassword} label="Password" />
      <p className={classes.error}>{isInvalid && 'Invalid name or phone'}</p>
      <Button type="submit" disabled={password.length < 8 || phone.length < 8} value="Submit" />
    </form>
  );
};

export default LoginForm;
