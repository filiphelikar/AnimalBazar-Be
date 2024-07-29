export class CreateInzeratDto {
  nadpis: string;
  popis: string;
  cena: number | 'Za odvoz';
  prodejce: string;
  telefon: string;
  lokalita: string;
  psc: string;
  email: string;
  heslo: string;
}
