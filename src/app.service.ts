import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {Inzerat} from './inzeraty';
import {druhy, Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';
import {AbstractMongoService} from './mongo.service';
import {InzeratSchema} from './schemas/inzerat.schema';
import * as CryptoJS from 'crypto-js';
import {maxLengthCheck, normalizeString, processImages} from './utils/utils';
import {EditInzeratDto} from './dtos/EditInzerat.dto';

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
  ): Promise<{_id: string; druh: Druhy}> {
    try {
      if (maxLengthCheck(inzeratDto, inzeratDto.heslo, images)) {
        const imgArray = processImages(inzeratDto.order, images);

        delete inzeratDto.order;
        inzeratDto.heslo = CryptoJS.MD5(inzeratDto.heslo).toString();
        inzeratDto.images = imgArray;

        const createdInzerat = await this.createOne(inzeratDto);
        return {_id: createdInzerat._id, druh: createdInzerat.druh};
      } else {
        throw new BadRequestException('Bad request. to long inputs.');
      }
    } catch (error) {
      console.error('Error creating inzerat:', error);
      throw error;
    }
  }

  public async deleteInzerat(params: {id: string; password: string}) {
    const data = await this.findOne(params.id);
    const password = CryptoJS.MD5(params.password).toString();
    if (password === data.heslo) {
      return this.deleteOne(params.id);
    } else {
      throw new ForbiddenException('Access denied. Invalid password.');
    }
  }

  public async editInzerat(editInzeratDto: EditInzeratDto, images: Express.Multer.File[]) {
    const data = await this.findOne(editInzeratDto._id);
    const password = CryptoJS.MD5(editInzeratDto.heslo).toString();
    if (password === data.heslo) {
      const order = JSON.parse(editInzeratDto.order);
      const updatedInzerat: Partial<EditInzeratDto> = {
        cena: editInzeratDto.cena,
        email: editInzeratDto.email,
        lokalita: editInzeratDto.lokalita,
        nazev: editInzeratDto.nazev,
        popis: editInzeratDto.popis,
        prodejce: editInzeratDto.prodejce,
        psc: editInzeratDto.psc,
        telefon: editInzeratDto.telefon,
        images: order.map((img) => {
          return img.type == 'old' ?
              img.name
            : 'http://localhost:3000/images/' + images.find((image) => image.originalname == img.name).filename;
        }),
      };

      if (maxLengthCheck(updatedInzerat)) {
        return this.updateOne(editInzeratDto._id, updatedInzerat);
      } else {
        throw new BadRequestException('Bad request. to long inputs.');
      }
    } else {
      throw new ForbiddenException('Access denied. Invalid password.');
    }
  }
}
