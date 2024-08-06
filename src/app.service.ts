import {Injectable} from '@nestjs/common';
import {Inzerat} from './inzeraty';
import {druhy, Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';
import {AbstractMongoService} from './mongo.service';
import {InzeratSchema} from './schemas/inzerat.schema';
import * as CryptoJS from 'crypto-js';
import {normalizeString, processImages} from './utils/utils';

@Injectable()
export class InzeratService extends AbstractMongoService<any> {
  constructor() {
    super('inzeraty', InzeratSchema);
  }

  public getAllDruhy(): Druhy[] {
    return druhy;
  }

  public async getAllInzerat(): Promise<Inzerat[]> {
    const data = await this.findAll();

    return data.map((inzerat) => ({...inzerat._doc, id: inzerat._doc._id}));
  }

  public async getAllOfOneDruh(druh: Druhy): Promise<Inzerat[]> {
    const data = await this.findByQuery({druh});

    return data.map((inzerat) => ({...inzerat._doc, id: inzerat._doc._id}));
  }

  public async getInzeratById(id: string): Promise<Inzerat | null> {
    try {
      return await this.findOne(id);
    } catch (error) {
      console.error(`Error fetching inzerat by id ${id}:`, error);
      return null;
    }
  }

  public async getFilteredInzeraty(params: {druh: string; param: string}): Promise<Inzerat[]> {
    let data;
    if (!params.druh) {
      data = await this.findAll();
    } else {
      const druh = params.druh;
      data = await this.findByQuery({druh});
    }

    const normalizedParam = normalizeString(params.param);

    return data
      .map((inzerat) => ({...inzerat._doc, id: inzerat._doc._id}))
      .filter((inzerat) =>
        normalizeString(
          Object.values(inzerat)
            .filter((value) => typeof value === 'string')
            .join(' '),
        ).includes(normalizedParam),
      );
  }

  public async createInzerat(
    inzeratDto: CreateInzeratDto,
    images: Express.Multer.File[],
  ): Promise<{id: string; druh: Druhy}> {
    try {
      const imgArray = processImages(inzeratDto.order, images);

      delete inzeratDto.order;
      inzeratDto.heslo = CryptoJS.MD5(inzeratDto.heslo).toString();
      inzeratDto.images = imgArray;

      const createdInzerat = await this.createOne(inzeratDto);

      return {id: createdInzerat._id, druh: createdInzerat.druh};
    } catch (error) {
      console.error('Error creating inzerat:', error);
      throw error;
    }
  }
}
