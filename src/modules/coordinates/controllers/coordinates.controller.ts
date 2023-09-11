import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from 'src/modules/common/interfaces/constants';
import { PaginationResponse } from 'src/modules/common/interfaces/pagination';
import { Coordinate } from '../interfaces/coordinates.schema';
import { CoordinatesService } from '../services/coordinates.service';

@ApiTags('coordinates')
@Controller('coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}

  @Get()
  getAll(
    @Query('pageNumber', {
      transform: (value) => Number(value ?? DEFAULT_PAGE_NUMBER),
    })
    pageNumber?: number,
    @Query('pageSize', {
      transform: (value) => Number(value ?? DEFAULT_PAGE_SIZE),
    })
    pageSize?: number,
  ): Promise<PaginationResponse<Coordinate>> {
    return this.coordinatesService.findAll({ pageNumber, pageSize });
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          callback(null, generateFilename(file));
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async import(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.coordinatesService.import(file);
  }
}

function generateFilename(file: Express.Multer.File) {
  return `${Date.now()}.${extname(file.originalname)}`;
}
