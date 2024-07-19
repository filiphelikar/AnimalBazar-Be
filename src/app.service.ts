//app.service.ts
import { Injectable } from '@nestjs/common';
import { Inzerat, inzeraty } from './inzeraty';

@Injectable()
export class InzeratService {
  //
  public getAllInzeraty(): Inzerat[] {
    return inzeraty;
  }

  public getInzeratById(inzeratID) {
    return inzeraty.find((inzerat) => inzerat.id === inzeratID);
  }
}
