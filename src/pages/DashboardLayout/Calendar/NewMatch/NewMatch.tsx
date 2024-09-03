import { useState } from "react";
import Button from "../../../../UI/Button/Button";
import Input from "../../../../UI/Input/Input";
import styles from "./newMatch.module.scss";

const NewMatch = ({ onCancel }: { onCancel: () => void }) => {
  const [start_date, setStart_date] = useState<string>("");
  const [start_time, setStart_time] = useState<string>("");
  const [end_time, setEnd_time] = useState<string>("");
  const [players, setPlayers] = useState<string>("");
  // const [price, setPrice] = useState<string>("");
  // const [price1Hour, setPrice1Hour] = useState<string>("");
  // const [price1_5Hour, setPrice1_5Hour] = useState<string>("");
  const [priceOneHour, setPriceOneHour] = useState<string>("");
  const [priceOneHourAndHalf, setpriceOneHourAndHalf] = useState<string>("");

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <p style={{ fontSize: 24 }}>New Match</p>
          <Input
            calendar
            className={styles.inputs}
            label="Start date"
            value={start_date}
            placeholder={new Date()
              .toJSON()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")}
            onChange={setStart_date}
          />
          <div className={styles.container}>
            <Input
              className={styles.inputs}
              label="Start time"
              value={start_time}
              onChange={setStart_time}
              placeholder={"18:00"}
            />{" "}
            <Input
              className={styles.inputs}
              label="End time"
              value={end_time}
              onChange={setEnd_time}
              placeholder="20:00"
            />
          </div>
          <Input
            className={styles.inputs}
            label="Players"
            value={players}
            onChange={setPlayers}
            placeholder="Max players for this match"
          />
          <div className={styles.container}>
          <Input
            className={styles.inputs}
            label="Price for 1 hour"
            value={priceOneHour}
            onChange={(value) => {
              setPriceOneHour(value);
              setpriceOneHourAndHalf(""); 
            }}
            placeholder=""
            disabled={priceOneHourAndHalf !== ""}
          />
            <Input
            className={styles.inputs}
            label="Price for 1.5 hours"
            value={priceOneHourAndHalf}
            onChange={(value) => {
              setpriceOneHourAndHalf(value);
              setPriceOneHour(""); 
            }}
            placeholder="4000 AMD"
            disabled={priceOneHour !== ""}
          />
          </div>
          
          <div className={styles.container}>
            <Button
              className={styles.confirm}
              onClick={() => {}}
              type="button"
              value="Confirm"
            />
            <Button
              className={styles.cancel}
              onClick={onCancel}
              type="button"
              value="Cancel"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMatch;
