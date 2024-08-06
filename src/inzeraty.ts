import {Druhy} from './druhy';

export interface Inzerat {
  id: number;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: string | 'Za odvoz';
  druh: Druhy;
  images: string[];
  lokalita: string;
  psc: string;
}
