//app.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import {EditInzeratDto} from './dtos/EditInzerat.dto';

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

  @Delete('inzerat/delete/')
  public deleteInzerat(@Query() params: {id: string; password: string}) {
    return this.inzeratService.deleteInzerat(params);
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
      fileFilter: (req, file, callback) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/heic' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/webp'
        ) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Nahraný soubor musí být obrázek'), false);
        }
      },
    }),
  )
  public async createInzerat(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createInzeratDto: CreateInzeratDto,
  ) {
    return this.inzeratService.createInzerat(createInzeratDto, images);
  }

  @Put('edit/inzerat')
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
  public async editInzerat(@UploadedFiles() images: Express.Multer.File[], @Body() editInzeratDto: EditInzeratDto) {
    return this.inzeratService.editInzerat(editInzeratDto, images);
  }
}
