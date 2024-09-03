import { useEffect, useState } from "react";
import Input from "../../../../UI/Input/Input";
import styles from "./matchDetails.module.scss";
import Button from "../../../../UI/Button/Button";
import { useParams } from "react-router-dom";
import axios, { BASE_URL } from "../../../../axios/axios";
import { IGame } from "../../../../types/Game";
import dayjs, { Dayjs } from "dayjs";
import Spinner from "../../../../UI/Spinner/Spinner";

const MatchDetails = () => {

  const [start_date, setStart_date] = useState<string>("");
  const [start_time, setStart_time] = useState<string>("");
  const [end_time, setEnd_time] = useState<string>("");
  const [max_players, setMax_players] = useState<number>(0);
  // const [price, setPrice] = useState<number>(0);
  // const [price1Hour, setPrice1Hour] = useState<number | null>(null);
  // const [price1_5Hour, setPrice1_5Hour] = useState<number | null>(null);
  const [priceOneHour, setPriceOneHour] = useState<number | null>(3000);
  const [priceOneHourAndHalf, setpriceOneHourAndHalf] = useState<number | null>(null);
  const [matchPlayers, setMatchPlayers] = useState<any[]>([]);

  const uniforms = ["black", "white"];

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get<IGame>("/game/getOne/" + id + "?language=am").then(({ data }) => {
        // console.log("Backend response:", data);  
        // console.log("Price for 1 hour:", data.priceOneHour);  
        // console.log("Price for 1.5 hours:", data.priceOneHourAndHalf); 
        if (!data) {
          return <Spinner />;
        }
        setMax_players(data.maxPlayersCount);
        setStart_date(
          `${new Date(data.startTime).getMonth() + 1}/${new Date(
            data.startTime
          ).getDate()}/${new Date(data.startTime).getFullYear()}`
        );
        setStart_time(
          `${String(new Date(data.startTime).getHours()).padStart(
            2,
            "0"
          )}:${String(new Date(data.startTime).getMinutes()).padStart(2, "0")}`
        );
        setEnd_time(
          `${String(new Date(data.endTime).getHours()).padStart(
            2,
            "0"
          )}:${String(new Date(data.endTime).getMinutes()).padStart(2, "0")}`
        );
        setPriceOneHour(data.priceOneHour);
        setpriceOneHourAndHalf(data.priceOneHourAndHalf);
        
        setMax_players(data.maxPlayersCount);
        setMatchPlayers(data.users);
      });
    }
  }, [id]);

  if (id && !start_date) {
    return <Spinner />;
  }

  return (
    <>
      <h1 style={{ color: "white" }}>Details of the game</h1>
      <div className={styles.modal}>
        <Input
          disabled={true}
          className={styles.inputs}
          label="Start Date"
          onChange={setStart_date}
          value={start_date}
        />
        <div className={styles.container}>
          <Input
            disabled={true}
            className={styles.inputs}
            label="Start time"
            value={start_time}
            onChange={setStart_time}
          />
          <Input
            disabled={true}
            className={styles.inputs}
            label="End time"
            value={end_time}
            onChange={setEnd_time}
          />
        </div>
        <Input
          disabled={true}
          className={styles.inputs}
          label="Max players"
          value={max_players.toString()}
          onChange={(val) => setMax_players(Number(val))}
        />
          <div className={styles.containerPrice}>
             <div className={styles.inputWrapper}>
                <div className={styles.inputGroup}>
                <label className={styles.label}>Price for 1 hour</label>
                <input
                  type="text"
                  disabled
                  className={styles.input}
                  value={priceOneHour !== null ? priceOneHour.toString() : ""}
                />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Price for 1.5 hours</label>
            <input
              type="text"
              disabled
              className={styles.input}
              value={priceOneHourAndHalf !== null ? priceOneHourAndHalf.toString() : ""}
            />
          </div>
          </div>
        </div>
        <h4 style={{ color: "white" }}>Match Players</h4>
        <div className={styles.playersBlock}>
          {matchPlayers.map((el, i) => (
            <div className={styles.players}>
              <p>{`${i + 1}. ${el.name}`}</p>
            </div>
          ))}
          <p style={{ color: "rgba(26, 130, 237, 1)", marginTop: 10 }}>{`${
            22 - matchPlayers.length < 10 ? "Only" : ""
          }${22 - matchPlayers.length} spots are left`}</p>
        </div>
       
      </div>
    </>
  );
};

export default MatchDetails;