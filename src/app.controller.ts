//app.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { InzeratService } from './app.service';
import { Inzerat } from './inzeraty';

@Controller('/api/')
export class AppController {
  constructor(private readonly inzeratService: InzeratService) {}

  @Get('inzeraty')
  public getAllInzerat() {
    return this.inzeratService.getAllInzerat();
  }

  @Get('inzeraty/:druh')
  public getInzeratyByDruh(@Param('druh') druh: string) {
    //todo udělat druh v service a ne check tady
    if (druh === 'kocka') {
      return this.inzeratService.getAllCats();
    } else if (druh === 'pes') {
      return this.inzeratService.getAllDogs();
    }
  }

  @Get('inzerat/:id')
  public getInzeratById(@Param('id') id: string): Inzerat {
    const inzeratID = +id;
    return this.inzeratService.getInzeratById(inzeratID);
  }
}
