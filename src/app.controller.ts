//app.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { InzeratService } from './app.service';
import { Inzerat } from './inzeraty';

@Controller('/api/inzeraty')
export class AppController {
  constructor(private readonly inzeratService: InzeratService) {}

  @Get()
  public getAllInzerat() {
    return this.inzeratService.getAllInzerat();
  }

  @Get('kocka')
  public getAllCats() {
    return this.inzeratService.getAllCats();
  }

  @Get('pes')
  public getAllDogs() {
    return this.inzeratService.getAllDogs();
  }

  @Get(':id')
  public getInzeratById(@Param('id') id: string): Inzerat {
    const inzeratID = +id;
    return this.inzeratService.getInzeratById(inzeratID);
  }
}
