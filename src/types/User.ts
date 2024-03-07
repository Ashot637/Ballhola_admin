import { type IGame } from './Game';

export interface IUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  img: string;
  UserGame: {
    team: number;
  };
  createdAt: string;
  role: string;
  accessToken: string;
  games: IGame[];
}

export type IGuest = Pick<IUser, 'phone' | 'name' | 'id'> & { team: number };
