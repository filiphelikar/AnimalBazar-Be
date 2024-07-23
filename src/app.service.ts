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
}
