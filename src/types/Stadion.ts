import { IFacilitie } from './Facilitie';

export interface IStadion {
  id: number;
  title_en: string;
  title_ru: string;
  title_am: string;
  address_en: string;
  address_ru: string;
  address_am: string;
  facilities: IFacilitie[];
  img: string;
}
