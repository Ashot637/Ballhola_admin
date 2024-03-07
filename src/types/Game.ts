import { type IStadion } from './Stadion';
import { type IGuest, type IUser } from './User';

export interface IGame {
  id: number;
  price: number;
  startTime: string;
  endTime: string;
  playersCount: number;
  maxPlayersCount: number;
  stadion: IStadion;
  users: IUser[];
}
