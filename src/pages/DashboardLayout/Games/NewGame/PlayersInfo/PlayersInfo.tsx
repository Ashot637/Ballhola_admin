import { useMemo, type FC, lazy, Suspense } from 'react';
import classes from './playersInfo.module.scss';
import { type IUser } from '../../../../../types/User';
import Spinner from '../../../../../UI/Spinner/Spinner';

const PlayersList = lazy(() => import('./PlayersList/PlayersList'));

interface IPlayersInfoProps {
  players: IUser[];
  group: number;
}

const PlayersInfo: FC<IPlayersInfoProps> = ({ players }) => {
  const playersFirstGroup = useMemo(() => {
    return players.filter(({ UserGame }) => UserGame.team === 1);
  }, [players]);

  const playersSecondGroup = useMemo(() => {
    return players.filter(({ UserGame }) => UserGame.team === 2);
  }, [players]);

  return (
    <div className="pt-15">
      <div className={classes.row}>
        {[1, 2].map((index) => {
          return (
            <div className={classes.rowItem} key={index}>
              <h4>Group {index}</h4>
            </div>
          );
        })}
      </div>
      <div className={classes.row}>
        {[1, 2].map((index) => {
          return (
            <div className={classes.rowItem} key={index}>
              <Suspense fallback={<Spinner />}>
                <PlayersList players={index === 1 ? playersFirstGroup : playersSecondGroup} />
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayersInfo;
