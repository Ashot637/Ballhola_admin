import Button from "../../../UI/Button/Button";
import Title from "../../../UI/Title/Title";
import styles from "./calendar.module.scss";
import { useState } from "react";
import NewMatch from "./NewMatch/NewMatch";
import CalendarLayout from "./CalendarLayout";

const Calendar = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [view, setView] = useState<string>('timeGridDay')
  const date = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <>
      {modal && <NewMatch onCancel={()=> setModal(false)} />}
      <div className="w-max flex jst-between">
        <Title />
        <div className="h-max">
          <div className="flex f-row jst-end">
            <div className={styles.options} onClick={()=> setView('timeGridDay')}>Daily</div>
            <div className={styles.options} onClick={()=> setView('dayGridWeek')}>Weekly</div>
            <div className={styles.options} onClick={()=> setView('dayGridMonth')}>Monthly</div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className="flex jst-between align-center">
          <p style={{ fontWeight: 400 }}>
            {`Today | `}
            <span className={styles.weekday}>{date}</span>
          </p>
          <Button
            className={styles.button}
            value="+ Add new match"
            onClick={() => setModal(true)}
            type="button"
          />
        </div>
        <CalendarLayout view={view}/>
      </div>
    </>
  );
};

export default Calendar;
