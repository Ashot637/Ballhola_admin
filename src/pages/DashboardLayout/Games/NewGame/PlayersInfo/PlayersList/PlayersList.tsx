import { memo, type FC } from 'react';
import classes from './playersList.module.scss';
import { type IUser } from '../../../../../../types/User';
import { BASE_URL } from '../../../../../../axios/axios';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

interface IPlayersListProps {
  players: IUser[];
}

const PlayersList: FC<IPlayersListProps> = memo(({ players }) => {
  return (
    <>
      <h5>Players</h5>
      <div className="r-gap-10 mb-15">
        {players.map((player) => {
          return (
            <Link to={'/dashboard/users/' + player.id} className={classes.player} key={player.id}>
              <Avatar src={player.img ? BASE_URL + player.img : ''} />
              <p>{player.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
});

export default PlayersList;
