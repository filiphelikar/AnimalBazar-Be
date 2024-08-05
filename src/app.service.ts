//app.service.ts
import {Injectable} from '@nestjs/common';
import {Inzerat, inzeraty} from './inzeraty';
import {druhy, Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';
import {AbstractMongoService} from './mongo.service';
import {InzeratSchema} from './schemas/inzerat.schema';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class InzeratService extends AbstractMongoService<any> {
  constructor() {
    super('inzeraty', InzeratSchema);
  }

  private normalizeString(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  public getAllDruhy(): Druhy[] {
    return druhy;
  }

  public async getAllInzerat(): Promise<Inzerat[]> {
    const data = await this.findAll();

    return data.map((inzerat) => {
      return {...inzerat._doc, id: inzerat._doc._id};
    });
  }

  public async getAllOfOneDruh(druh: Druhy) {
    const data = await this.findByQuery({druh});

    return data.map((inzerat) => {
      return {...inzerat._doc, id: inzerat._doc._id};
    });
  }

  public async getInzeratById(id: string) {
    return await this.findOne(id);
  }

  public async getFilteredInzeraty(param: string) {
    let data = await this.findAll();

    data = data.map((inzerat) => {
      return {...inzerat._doc, id: inzerat._doc._id};
    });

    const result = data.filter((inzerat) => {
      return this.normalizeString(
        Object.values(inzerat)
          .filter((hodnota) => typeof hodnota == 'string')
          .join(' '),
      ).includes(this.normalizeString(param));
    });

    return result;
  }

  public async createInzerat(inzerat: CreateInzeratDto, images: Express.Multer.File[]) {
    const imgArray = [];

    JSON.parse(inzerat.order).forEach((name) => {
      imgArray.push(`http://localhost:3000/images/${images.find((img) => img.originalname == name).filename}`);
    });

    delete inzerat.order;
    inzerat.heslo = CryptoJS.MD5(inzerat.heslo).toString();

    inzerat.images = imgArray;
    const data = await this.createOne(inzerat);

    return {id: data._id, druh: data.druh};
  }
}
