//app.service.ts
import { Injectable } from '@nestjs/common';
import { Inzerat, inzeraty } from './inzeraty';
import { druhy, Druhy } from './druhy';

@Injectable()
export class InzeratService {
  //
  public getAllDruhy(): Druhy[] {
    return druhy;
  }

  public getAllInzerat(): Inzerat[] {
    return inzeraty;
  }

  public getAllOfOneDruh(druh: Druhy): Inzerat[] {
    const newInzeraty = inzeraty.filter((inzerat) => inzerat.druh === druh);
    return newInzeraty;
  }

  public getInzeratById(id: number) {
    return inzeraty.find((inzerat) => inzerat.id === id);
  }

  public getFilteredInzeraty(param: string): Inzerat[] {
    const normalizeString = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    const paramWords = param
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(normalizeString);

    const matchesParam = (str: string) =>
      paramWords.every((word) => normalizeString(str).includes(word));

    const inzeratyByNazev = inzeraty.filter((inzerat) =>
      matchesParam(inzerat.nazev),
    );
    const inzeratyByPopis = inzeraty.filter(
      (inzerat) =>
        matchesParam(inzerat.popis) && !inzeratyByNazev.includes(inzerat),
    );

    return [...inzeratyByNazev, ...inzeratyByPopis];
  }
}
