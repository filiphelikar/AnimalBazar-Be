//app.service.ts
import { Injectable } from '@nestjs/common';
import { Inzerat, inzeraty } from './inzeraty';

@Injectable()
export class InzeratService {
  //
  public getAllCats(): Inzerat[] {
    const newInzeraty = inzeraty.filter((inzerat) => inzerat.druh === 'Kočka');
    return newInzeraty;
  }

  public getAllDogs(): Inzerat[] {
    const newInzeraty = inzeraty.filter((inzerat) => inzerat.druh === 'Pes');

    return newInzeraty;
  }

  public getInzeratById(inzeratID) {
    return inzeraty.find((inzerat) => inzerat.id === inzeratID);
  }
}
