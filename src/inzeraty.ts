export interface Inzerat {
  id: number;
  nazev: string;
  prodejce: string;
  telefon: string;
  email: string;
  popis: string;
  cena: number | string;
  druh: string;
  images: string[];
}

const inzeraty: Inzerat[] = [
  {
    id: 0,
    nazev: 'Nabízím kočku perskou',
    prodejce: 'Pavel Novák',
    telefon: '777 123 456',
    email: 'pavel.novak@example.com',
    popis:
      'Nabízím kočku perskou, je velmi přátelská a vhodná k dětem. Kočka je stará tři roky a má všechny potřebné očkování. Je zvyklá na život v bytě a je velmi čistotná. Hledáme pro ni nový domov, protože se stěhujeme do menšího bytu a nemáme pro ni dostatek místa.',
    cena: 1500,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 1,
    nazev: 'Britská kočka k adopci',
    prodejce: 'Jana Dvořáková',
    telefon: '774 987 654',
    email: 'jana.dvorakova@example.com',
    popis:
      'Britská kočka, má všechny potřebné očkování. Je velmi hravá a miluje společnost lidí. Kočka je zvyklá na další domácí zvířata a dobře vychází s dětmi. Hledáme pro ni nový domov, protože se u nás objevila alergie na kočičí srst.',
    cena: 'Za odvoz',
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 2,
    nazev: 'Koťátka evropské krátkosrsté',
    prodejce: 'Karel Svoboda',
    telefon: '602 345 678',
    email: 'karel.svoboda@example.com',
    popis:
      'Koťátka evropské krátkosrsté kočky, jsou velmi hravá a zvídavá. Nabízíme tři koťátka, dvě holky a jednoho kluka. Všechna koťátka jsou odčervená a mají základní očkování. Jsou zvyklá na život v domě i na zahradě.',
    cena: 500,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 3,
    nazev: 'Sibiřská kočka k adopci',
    prodejce: 'Eva Novotná',
    telefon: '605 432 876',
    email: 'eva.novotna@example.com',
    popis:
      'Sibiřská kočka, vhodná do bytu i domu. Kočka je velmi mazlivá a miluje pozornost. Její srst je hustá a vyžaduje pravidelnou péči. Hledáme pro ni domov, kde bude mít dostatek prostoru pro pohyb a hraní. Kočka je očkovaná a čipovaná.',
    cena: 3000,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 4,
    nazev: 'Sphynx kočka bez srsti',
    prodejce: 'Michal Černý',
    telefon: '721 876 543',
    email: 'michal.cerny@example.com',
    popis:
      'Sphynx kočka, bez srsti, velmi mazlivá a společenská. Tato kočka je ideální pro lidi s alergií na kočičí srst. Je zvyklá na život v bytě a miluje teplé prostředí. Hledáme pro ni nový domov, kde bude mít dostatek pozornosti a péče.',
    cena: 2500,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 5,
    nazev: 'Siamská kočka k adopci',
    prodejce: 'Petra Malá',
    telefon: '731 654 321',
    email: 'petra.mala@example.com',
    popis:
      'Siamská kočka, hledá nový domov. Je velmi inteligentní a hravá, má ráda společnost a je zvyklá na děti. Její srst je krátká a lesklá, vyžaduje minimální péči. Hledáme pro ni nový domov kvůli stěhování do zahraničí.',
    cena: 'Za odvoz',
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 6,
    nazev: 'Fenku zlatého retrívra',
    prodejce: 'Tomáš Vávra',
    telefon: '604 123 789',
    email: 'tomas.vavra@example.com',
    popis:
      'Nabízím fenku zlatého retrívra, velmi přátelská a hravá. Fenka je stará čtyři roky, má všechny potřebné očkování a je čipovaná. Je zvyklá na děti a další domácí zvířata. Hledáme pro ni nový domov, protože se stěhujeme do menšího bytu.',
    cena: 2000,
    druh: 'Pes',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 7,
    nazev: 'Mainská mývalí kočka',
    prodejce: 'Lenka Horáková',
    telefon: '777 321 654',
    email: 'lenka.horakova@example.com',
    popis:
      'Mainská mývalí kočka, hledá nový domov. Tato kočka je velmi přítulná a má ráda společnost lidí. Její srst je hustá a vyžaduje pravidelnou péči. Kočka je zvyklá na život v bytě i na zahradě. Hledáme pro ni nový domov, kde bude mít dostatek prostoru pro pohyb.',
    cena: 4000,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 8,
    nazev: 'Koťátko ragdoll',
    prodejce: 'Josef Král',
    telefon: '603 987 654',
    email: 'josef.kral@example.com',
    popis:
      'Koťátko ragdoll, velmi přítulné a hravé. Toto koťátko je ideální pro rodiny s dětmi, je velmi klidné a mazlivé. Má základní očkování a je odčervené. Hledáme pro něj nový domov, kde bude mít dostatek lásky a péče.',
    cena: 3500,
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
  {
    id: 9,
    nazev: 'Kočka bengálská k adopci',
    prodejce: 'Alena Veselá',
    telefon: '601 456 789',
    email: 'alena.vesela@example.com',
    popis:
      'Kočka bengálská, je velmi aktivní a hravá. Tato kočka je vhodná pro lidi, kteří mají rádi aktivní životní styl. Její srst je krátká a lesklá, vyžaduje minimální péči. Hledáme pro ni nový domov, kde bude mít dostatek prostoru pro pohyb a hraní.',
    cena: 'Za odvoz',
    druh: 'Kočka',
    images: [
      'http://localhost:3000/images/IMG_2.JPEG',
      'http://localhost:3000/images/IMG_1.JPEG',
      'http://localhost:3000/images/IMG_3.JPEG',
    ],
  },
];

export { inzeraty };
