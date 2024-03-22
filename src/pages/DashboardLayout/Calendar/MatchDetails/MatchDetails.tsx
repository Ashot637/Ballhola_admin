import Input from "../../../../UI/Input/Input";
import styles from "./matchDetails.module.scss";

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

  return (
    <>
      <h1>Details of the game</h1>
      <div className={styles.modal}>
        <Input
          className={styles.inputs}
          label="Start Date"
          onChange={() => {}}
          value="hii"
        />
        <div className={styles.container}>
          <Input
            className={styles.inputs}
            label="Start time"
            value={"start_time"}
            onChange={() => {}}
          />{" "}
          <Input
            className={styles.inputs}
            label="End time"
            value={""}
            onChange={() => {}}
          />
        </div>
        <Input
          className={styles.inputs}
          label="Players"
          value={"End time"}
          onChange={() => {}}
        />
        <Input
          className={styles.inputs}
          label="Price per person"
          value={"End time"}
          onChange={() => {}}
        />
        <h4>Match Players</h4>
        <div className={styles.playersBlock}>
          {matchPlayers.map((el, i) => (
            <div className={styles.players}>
              <p>{`${i + 1}. ${el.name}`}</p>
              <p>{el.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchDetails;
