import {Inzerat} from 'src/inzeraty';

export function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function processImages(order: string, images: Express.Multer.File[]): string[] {
  const imgArray: string[] = [];

  const parsedOrder = JSON.parse(order) as string[];
  parsedOrder.forEach((name) => {
    const img = images.find((img) => img.originalname === name);
    if (img) {
      imgArray.push(`http://localhost:3000/images/${img.filename}`);
    }
  });

  return imgArray;
}

export const maxLengthCheck = (inzerat: Partial<Inzerat>, password?, images?): boolean => {
  if (password && images) {
    if (
      inzerat.cena.length <= 8 &&
      inzerat.email.length <= 50 &&
      images.length <= 8 &&
      inzerat.lokalita.length <= 40 &&
      inzerat.nazev.length <= 60 &&
      inzerat.popis.length <= 600 &&
      inzerat.prodejce.length <= 30 &&
      inzerat.psc.length <= 10 &&
      inzerat.telefon.length <= 16 &&
      password.length <= 50
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (
      inzerat.cena.length <= 7 &&
      inzerat.email.length <= 50 &&
      inzerat.images.length <= 8 &&
      inzerat.lokalita.length <= 40 &&
      inzerat.nazev.length <= 60 &&
      inzerat.popis.length <= 600 &&
      inzerat.prodejce.length <= 30 &&
      inzerat.psc.length <= 10 &&
      inzerat.telefon.length <= 16
    ) {
      return true;
    } else {
      return false;
    }
  }
};
