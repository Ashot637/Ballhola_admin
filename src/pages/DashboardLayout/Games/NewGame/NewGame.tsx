import { useState, useEffect, type FC, type FormEvent } from "react";
import classes from "./newGame.module.scss";

import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";

import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";

import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MenuItem, Select } from "@mui/material";
import dayjs, { type Dayjs } from "dayjs";

import useSWR from "swr";
import axios from "../../../../axios/axios";

import Spinner from "../../../../UI/Spinner/Spinner";
import { type IStadion } from "../../../../types/Stadion";
import { type IGame } from "../../../../types/Game";

import { IUser } from "../../../../types/User";

const fetcher = (url: string) => axios.get(url).then(({ data }) => data);

const NewGame: FC = () => {
  const { data: stadions } = useSWR<IStadion[]>("/stadion/getAll", fetcher);
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedStaion, setSelectedStaion] = useState<string>("");
  const [maxPlayersCount, setMaxPlayersCount] = useState<number>(22);
  const [price, setPrice] = useState<number>(3000);
  const [startTime, setStartTime] = useState<Date | null | Dayjs>(null);
  const [endTime, setEndTime] = useState<Date | null | Dayjs>(null);
  const [players, setPlayers] = useState<IUser[]>([]);

  useEffect(() => {
    if (stadions && !id) {
      setSelectedStaion(stadions[0]?.title_en);
    }
  }, [stadions, id]);

  useEffect(() => {
    if (id) {
      axios.get<IGame>("/game/getOne/" + id).then(({ data }) => {
        setMaxPlayersCount(data.maxPlayersCount);
        setStartTime(dayjs(data.startTime));
        setEndTime(dayjs(data.endTime));
        setSelectedStaion(data.stadion.title_en);
        setPrice(data.price);
        setPlayers(data.users);
      });
    }
  }, [id]);

  if (!stadions || (id && !selectedStaion)) {
    return <Spinner />;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stadionId = stadions?.find(
      (stadion: IStadion) => stadion.title_en === selectedStaion
    )?.id;
    const data = {
      startTime,
      endTime,
      maxPlayersCount,
      stadionId,
      price,
      range : 1
    };
    if (!id) {
      await axios.post("/game/create", data);
    } else {
      await axios.patch("/game/update/" + id, data);
    }
    navigate("/dashboard/games");
  };

  return (
    <div className="h-max">
      <div className="flex c-gap-10 mb-15">
        <Link to={"/dashboard/games"}>
          <IoIosArrowRoundBack size={45} className={classes.icon} />
        </Link>
        <h2 className="title">{id ? "Edit Game" : "New Game"}</h2>
      </div>
      <div className="h-max pb-65">
        <form className={classes.form} onSubmit={onSubmit}>
          <Input
            value={String(maxPlayersCount)}
            onChange={(value) => setMaxPlayersCount(Number(value))}
            type="number"
            label="Maximum players count"
          />
          <Input
            value={String(price)}
            onChange={(value) => setPrice(Number(value))}
            type="number"
            label="Pirce"
          />
          <label className={classes.label}>Start time</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              ampm={false}
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              className="custom-datetime-picker"
            />
          </LocalizationProvider>
          <label className={classes.label}>End time</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              ampm={false}
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              className="custom-datetime-picker"
            />
          </LocalizationProvider>
          <label className={classes.label}>Stadium</label>
          {!selectedStaion && !id ? (
            <label className={classes.label}>Empty Stadiums</label>
          ) : (
            <Select
              value={selectedStaion}
              displayEmpty
              onChange={(e) => setSelectedStaion(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              {stadions.map((stadion, index: number) => (
                <MenuItem key={index} value={stadion.title_en}>
                  {stadion.title_en}
                </MenuItem>
              ))}
            </Select>
          )}
          <Button
            disabled={
              !startTime ||
              !endTime ||
              !maxPlayersCount ||
              !selectedStaion ||
              !price
            }
            className={classes.btn}
            value={id ? "Edit" : "Create"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default NewGame;
