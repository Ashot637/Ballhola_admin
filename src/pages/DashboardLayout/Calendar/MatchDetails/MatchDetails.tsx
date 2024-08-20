import { useEffect, useState } from "react";
import Input from "../../../../UI/Input/Input";
import styles from "./matchDetails.module.scss";
import Button from "../../../../UI/Button/Button";
import { useParams } from "react-router-dom";
import axios, { BASE_URL } from "../../../../axios/axios";
import { IGame } from "../../../../types/Game";
import dayjs, { Dayjs } from "dayjs";
import Spinner from "../../../../UI/Spinner/Spinner";

// const MatchDetails = () => {
//   // const matchPlayers = [
//   //   { name: "Quantum Seeker", role: "Goalkeeper" },
//   //   { name: "Quantum Seeker", role: "Goalkeeper" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   //   { name: "Luna Sparkle", role: "Player" },
//   // ];

//   const [start_date, setStart_date] = useState<string>("");
//   const [start_time, setStart_time] = useState<string>("");
//   const [end_time, setEnd_time] = useState<string>("");
//   const [max_players, setMax_players] = useState<number>(0);
//   const [price, setPrice] = useState<number>(0);
//   const [matchPlayers, setMatchPlayers] = useState<any[]>([]);

//   const uniforms = ["black", "white"];

//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       axios.get<IGame>("/game/getOne/" + id).then(({ data }) => {
//         console.log(data);
//         if (!data) {
//           return <Spinner />;
//         }
//         setMax_players(data.maxPlayersCount);
//         setStart_date(
//           `${new Date(data.startTime).getMonth() + 1}/${new Date(
//             data.startTime
//           ).getDate()}/${new Date(data.startTime).getFullYear()}`
//         );
//         setStart_time(
//           `${String(new Date(data.startTime).getHours()).padStart(
//             2,
//             "0"
//           )}:${String(new Date(data.startTime).getMinutes()).padStart(2, "0")}`
//         );
//         setEnd_time(
//           `${String(new Date(data.endTime).getHours()).padStart(
//             2,
//             "0"
//           )}:${String(new Date(data.endTime).getMinutes()).padStart(2, "0")}`
//         );
//         setPrice(data.price);
//         setMax_players(data.maxPlayersCount);
//         setMatchPlayers(data.users);
//       });
//     }
//   }, [id]);

//   if (id && !start_date) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       <h1 style={{ color: "white" }}>Details of the game</h1>
//       <div className={styles.modal}>
//         <Input
//           disabled={true}
//           className={styles.inputs}
//           label="Start Date"
//           onChange={setStart_date}
//           value={start_date}
//         />
//         <div className={styles.container}>
//           <Input
//             disabled={true}
//             className={styles.inputs}
//             label="Start time"
//             value={start_time}
//             onChange={setStart_time}
//           />
//           <Input
//             disabled={true}
//             className={styles.inputs}
//             label="End time"
//             value={end_time}
//             onChange={setEnd_time}
//           />
//         </div>
//         <Input
//           disabled={true}
//           className={styles.inputs}
//           label="Max players"
//           value={max_players.toString()}
//           onChange={(val) => setMax_players(Number(val))}
//         />
//         <Input
//           disabled={true}
//           className={styles.inputs}
//           label="Price per person"
//           value={price.toString()}
//           onChange={(val) => setPrice(Number(val))}
//         />
//         <h4 style={{ color: "white" }}>Match Players</h4>
//         <div className={styles.playersBlock}>
//           {matchPlayers.map((el, i) => (
//             <div className={styles.players}>
//               <p>{`${i + 1}. ${el.name}`}</p>
//             </div>
//           ))}
//           <p style={{ color: "rgba(26, 130, 237, 1)", marginTop: 10 }}>{`${
//             22 - matchPlayers.length < 10 ? "Only" : ""
//           }${22 - matchPlayers.length} spots are left`}</p>
//         </div>
//         {/* <p style={{ textAlign: "center", fontStyle: "italic" }}>
//           Most of the players have chosen{" "}
//           <span style={{ color: uniforms[0], textDecoration: "underline" }}>
//             {uniforms[0]}
//           </span>{" "}
//           and{" "}
//           <span style={{ color: uniforms[1], textDecoration: "underline" }}>
//             {uniforms[1]}
//           </span>{" "}
//           uniforms.
//         </p> */}
//       </div>
//     </>
//   );
// };

// export default MatchDetails;



const MatchDetails = () => {
  const [start_date, setStart_date] = useState<string>("");
  const [start_time, setStart_time] = useState<string>("");
  const [end_time, setEnd_time] = useState<string>("");
  const [max_players, setMax_players] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [matchPlayers, setMatchPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get<IGame>(`/game/getOne/${id}`)
        .then(({ data }) => {
          console.log("Fetched data:", data); 
          if (data) {
            const { startTime, endTime, price, maxPlayersCount, users } = data;
            setMax_players(maxPlayersCount);
            setStart_date(dayjs(startTime).format("MM/DD/YYYY"));
            setStart_time(dayjs(startTime).format("HH:mm"));
            setEnd_time(dayjs(endTime).format("HH:mm"));
            setPrice(price);
            setMatchPlayers(users);
          } else {
            console.warn("No game data found."); 
          }
        })
        .catch((error) => {
          console.error("Failed to fetch game details:", error); 
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className={styles.heading}>Details of the game</h1>
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
        <Input
          disabled={true}
          className={styles.inputs}
          label="Price per person"
          value={price.toString()}
          onChange={(val) => setPrice(Number(val))}
        />
        <h4 className={styles.heading}>Match Players</h4>
        <div className={styles.playersBlock}>
          {matchPlayers.length > 0 ? (
            matchPlayers.map((el, i) => (
              <div className={styles.players} key={el.id || i}>
                <p>{`${i + 1}. ${el.name}`}</p>
              </div>
            ))
          ) : (
            <p>No players registered.</p> 
          )}
          <p className={styles.spotsLeft}>
            {`${22 - matchPlayers.length < 10 ? "Only" : ""} ${
              22 - matchPlayers.length
            } spots are left`}
          </p>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;