//app.service.ts
import {Injectable} from '@nestjs/common';
import {Inzerat, inzeraty} from './inzeraty';
import {druhy, Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';

@Injectable()
export class InzeratService {
  private normalizeString(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private inzeratByDruh(druh) {
    const newInzeraty = inzeraty.filter((inzerat) => inzerat.druh === druh);
    return newInzeraty;
  }

  public getAllDruhy(): Druhy[] {
    return druhy;
  }

  public getAllInzerat(): Inzerat[] {
    return inzeraty;
  }

  public getAllOfOneDruh(druh: Druhy): Inzerat[] {
    return this.inzeratByDruh(druh);
  }

  public getInzeratById(id: number) {
    return inzeraty.find((inzerat) => inzerat.id === id);
  }

  public getFilteredInzeraty(param: string): Inzerat[] {
    const result = inzeraty.filter((inzerat) => {
      return this.normalizeString(
        Object.values(inzerat)
          .filter((hodnota) => typeof hodnota == 'string')
          .join(' '),
      ).includes(this.normalizeString(param));
    });

    return result;
  }

  public createInzerat(inzerat: CreateInzeratDto) {}
}
