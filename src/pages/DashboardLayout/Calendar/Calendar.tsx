import Button from '../../../UI/Button/Button';
import Title from '../../../UI/Title/Title';
import styles from './calendar.module.scss';
import { useState } from 'react';
import NewMatch from './NewMatch/NewMatch';
import CalendarLayout from './CalendarLayout';
import useSWR from 'swr';
import { IGame } from '../../../types/Game';
import Spinner from '../../../UI/Spinner/Spinner';
import axios, { BASE_URL } from '../../../axios/axios';
import { IStadion } from '../../../types/Stadion';

const fetcher = (url: string) => axios.post(url).then(({ data }) => data);
const Calendar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [view, setView] = useState<string>('timeGridDay');

  const { data, mutate } = useSWR<IGame[]>('/game/getAllFromAdminPanel', fetcher);
  const { data: stadiums } = useSWR<IStadion[]>('/stadion/getAll', fetcher);

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      {modal && <NewMatch onCancel={() => setModal(false)} />}
      <div className="w-max flex jst-between">
        <Title />
        <div className="h-max">
          <div className="flex f-row jst-end">
            <div className={styles.options} onClick={() => setView('timeGridDay')}>
              Daily
            </div>
            <div className={styles.options} onClick={() => setView('dayGridWeek')}>
              Weekly
            </div>
            <div className={styles.options} onClick={() => setView('dayGridMonth')}>
              Monthly
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <CalendarLayout stadiums={stadiums ? stadiums : []} view={view} data={data} />
      </div>
    </>
  );
};

export default Calendar;
