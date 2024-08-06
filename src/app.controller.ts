//app.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {InzeratService} from './app.service';
import {Druhy} from './druhy';
import {CreateInzeratDto} from './dtos/CreateInzerat.dto';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';

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
  public getInzeratById(@Param('id') id: string) {
    return this.inzeratService.getInzeratById(id);
  }

  @Get('search')
  getFilteredInzeraty(@Query() params: {druh: string; param: string}) {
    return this.inzeratService.getFilteredInzeraty(params);
  }

  @Post('create/inzerat')
  @UseInterceptors(
    FilesInterceptor('images', 8, {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  public async createInzerat(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createInzeratDto: CreateInzeratDto,
  ) {
    return this.inzeratService.createInzerat(createInzeratDto, images);
  }
}
