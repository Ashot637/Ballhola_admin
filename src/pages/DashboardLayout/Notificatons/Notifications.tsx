import useSWR from "swr";
import axios, { BASE_URL } from "../../../axios/axios";
import Title from "../../../UI/Title/Title";
import styles from "./notifications.module.scss";
import TimeDifference from "./TimeDifference";
import formatDate from "../../../helpers/formatDate";
const {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  differenceInSeconds,
  parseISO,
} = require("date-fns");

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const Notifications = () => {
  const { data: notifs } = useSWR("stadion/getAllNotifications", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log(notifs);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
    

  return (
    <>
      <Title />
      <div className={styles.container}>
        {notifs?.reverse().map((el: any, i: number) => (
          <div key={i} className={styles.block}>
            <div
              style={
                el.isNew == false
                  ? { backgroundColor: "#031852" }
                  : { backgroundColor: "#2A88E9" }
              }
              className={styles.border}
            >
              <div className={styles.bell}></div>
            </div>
            <div className={styles.texts}>
              <p>
              <span style={{ color: "#4b65af", textDecoration: "underline" }}>
                  {el.user.name}
                </span>
               {' '} has booked a ticket on {' '}
                <span style={{ color: "#4b65af", textDecoration: "underline" }}>
                  {formatter.format(new Date(el.game.startTime))}
                </span>
                {" at"}{" "}
                <span style={{ color: "#4b65af", textDecoration: "underline" }}>
                  {el.stadion.title_en}
                </span>
              </p>
              {/* <p style={{ color: "#BEC1BE", marginTop: 10 }}>
              </p> */}
              <p style={{ fontStyle: "italic", marginTop: 10, fontSize:14 }}>
                {formatDate(el.createdAt)}
                {/* {differenceInMinutes(new Date(), parseISO(el.createdAt)) > 60 &&
                differenceInMinutes(new Date(), parseISO(el.createdAt)) < 1440
                  ? `${differenceInHours(
                      new Date(),
                      parseISO(el.createdAt)
                    )} hours ago`
                  : differenceInHours(new Date(), parseISO(el.createdAt)) > 24
                  ? `${differenceInDays(
                      new Date(),
                      parseISO(el.createdAt)
                    )} days ago`
                  : `${differenceInMinutes(
                      new Date(),
                      parseISO(el.createdAt)
                    )} minutes ago`} */}
              </p>
              <div className={styles.divider}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notifications;
