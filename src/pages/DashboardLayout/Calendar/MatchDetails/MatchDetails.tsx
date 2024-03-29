import { useState } from "react";
import Input from "../../../../UI/Input/Input";
import styles from "./matchDetails.module.scss";
import Button from "../../../../UI/Button/Button";

const MatchDetails = () => {
  const matchPlayers = [
    { name: "Quantum Seeker", role: "Goalkeeper" },
    { name: "Quantum Seeker", role: "Goalkeeper" },  
    { name: "Luna Sparkle", role: "Player" },
    { name: "Luna Sparkle", role: "Player" },
    { name: "Luna Sparkle", role: "Player" },
    { name: "Luna Sparkle", role: "Player" },
    { name: "Luna Sparkle", role: "Player" },
    { name: "Luna Sparkle", role: "Player" },
  ];

  const [start_date, setStart_date] = useState<string>("");
  const [end_time, setEnd_time] = useState<string>("");
  const [start_time, setStart_time] = useState<string>("");
  const [max_players, setMax_players] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const uniforms = ["black", "white"];

  return (
    <>
      <h1 style={{ color: "white" }}>Details of the game</h1>
      <div className={styles.modal}>
        <Input
          className={styles.inputs}
          label="Start Date"
          onChange={setStart_date}
          value={start_date}
        />
        <div className={styles.container}>
          <Input
            className={styles.inputs}
            label="Start time"
            value={start_time}
            onChange={setStart_time}
          />
          <Input
            className={styles.inputs}
            label="End time"
            value={end_time}
            onChange={setEnd_time}
          />
        </div>
        <Input
          className={styles.inputs}
          label="Max players"
          value={max_players.toString()}
          onChange={(val) => setMax_players(Number(val))}
        />
        <Input
          className={styles.inputs}
          label="Price per person"
          value={price.toString()}
          onChange={(val) => setPrice(Number(val))}
        />
        <h4>Match Players</h4>
        <div className={styles.playersBlock}>
          {matchPlayers.map((el, i) => (
            <div className={styles.players}>
              <p>{`${i + 1}. ${el.name}`}</p>
              <p style={{ color: "rgba(190, 193, 190, 1)", fontSize: 14 }}>
                {el.role}
              </p>
            </div>
          ))}
          <p style={{ color: "rgba(209, 226, 49, 1)", marginTop: 10 }}>{`Only ${
            22 - matchPlayers.length
          } spots are left`}</p>
          <Button
            className={styles.button}
            onClick={() => {}}
            value="Make a reservation"
            type="button"
          />
        </div>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Most of the players have chosen{" "}
          <span style={{ color: uniforms[0], textDecoration: "underline" }}>
            {uniforms[0]}
          </span>{" "}
          and{" "}
          <span style={{ color: uniforms[1], textDecoration: "underline" }}>
            {uniforms[1]}
          </span>{" "}
          uniforms.
        </p>
      </div>
    </>
  );
};

export default MatchDetails;
