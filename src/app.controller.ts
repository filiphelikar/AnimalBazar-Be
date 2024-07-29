//app.controller.ts
import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import {InzeratService} from './app.service';
import {Inzerat} from './inzeraty';
import {Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';

@Controller('/api/')
export class AppController {
  constructor(private readonly inzeratService: InzeratService) {}

  @Get('druhy')
  public getAllDruhy() {
    return this.inzeratService.getAllDruhy();
  }

  @Get('inzeraty')
  public getAllInzerat() {
    return this.inzeratService.getAllInzerat();
  }

  @Get('inzeraty/:druh')
  public getInzeratyByDruh(@Param('druh') druh: Druhy) {
    return this.inzeratService.getAllOfOneDruh(druh);
  }

  @Get('inzerat/:id')
  public getInzeratById(@Param('id') id: string): Inzerat {
    const inzeratID = +id;
    return this.inzeratService.getInzeratById(inzeratID);
  }
  @Get('search')
  getFilteredInzeraty(@Query('param') param: string) {
    return this.inzeratService.getFilteredInzeraty(param);
  }

  @Post('inzerat/create')
  public createInzerat(@Body() createInzeratDto: CreateInzeratDto) {
    return this.inzeratService.createInzerat(createInzeratDto);
  }
}
