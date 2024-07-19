//app.controller.ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { InzeratService } from './app.service';
import { Inzerat } from './inzeraty';

@Controller('/api/inzeraty')
export class AppController {
  constructor(private readonly inzeratService: InzeratService) {}

  @Get()
  public getAllInzeraty() {
    return this.inzeratService.getAllInzeraty();
  }

  @Get(':id')
  public getInzeratById(@Param('id') id: string): Inzerat {
    const inzeratID = +id;
    return this.inzeratService.getInzeratById(inzeratID);
  }
}
