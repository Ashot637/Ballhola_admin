import { useEffect, type FC, useState } from 'react';
import classes from './singleUser.module.scss';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Input from '../../../../UI/Input/Input';
import axios, { BASE_URL } from '../../../../axios/axios';
import { IUser } from '../../../../types/User';
import Spinner from '../../../../UI/Spinner/Spinner';
import SingleUserGames from './SingleUserGames/SingleUserGames';

const SingleUser: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    axios.get('/user/getOne/' + id).then(({ data }) => setUser(data));
  }, [id]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="h-max">
      <div className="flex c-gap-10 mb-15">
        <IoIosArrowRoundBack size={45} className={classes.icon} onClick={() => navigate(-1)} />
        <h2 className="title">{user.name}</h2>
      </div>
      <div className="flex c-gap-25 mb-15">
        <Avatar src={user.img ? BASE_URL + user.img : ''} className={classes.avatar} />
        <div className="flex f-col r-gap-15 w-max">
          <Input value={user.name} onChange={() => {}} placeholder="Name" />
          <Input value={user.phone} onChange={() => {}} placeholder="Phone number" />
          <Input value={user.email} onChange={() => {}} placeholder="Email" />
          <Input value={user.address} onChange={() => {}} placeholder="Address" />
        </div>
      </div>
      <SingleUserGames games={user.games} />
    </div>
  );
};

export default SingleUser;
