import {Druhy} from 'src/druhy';

export class CreateInzeratDto {
  nazev: string;
  popis: string;
  cena: string | 'Za odvoz';
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
  images: string[];
  druh: Druhy;
  order: string;
}
