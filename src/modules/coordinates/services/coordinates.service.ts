import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import {
  PaginationParams,
  PaginationResponse,
} from 'src/modules/common/interfaces/pagination';
import { parseDate } from 'src/modules/common/utils/parser';
import { Coordinate } from '../interfaces/coordinates.schema';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectModel(Coordinate.name) private coordinateModel: Model<Coordinate>,
  ) {}

  async findAll({
    pageNumber,
    pageSize,
  }: PaginationParams): Promise<PaginationResponse<Coordinate>> {
    let count = await this.coordinateModel.count();
    let totalPage = Math.ceil(count / pageSize);

    if (pageNumber > totalPage) {
      pageNumber = totalPage;
    }
    if (pageNumber < 1) {
      pageNumber = 1;
    }

    return new Promise((resolve, reject) => {
      this.coordinateModel
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec()
        .then(async (data) => {
          return resolve({
            items: data,
            hasNext: pageNumber - 1 < totalPage,
            hasPrevious: pageNumber > 1,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPage: totalPage,
          });
        })
        .catch(reject);
    });
  }

  async import(file: Express.Multer.File) {
    try {
      const result = await this.coordinateModel.deleteMany({}).exec();
      if (!result.acknowledged) {
        Promise.reject();
      }

      const content = await fs.promises.readFile(file.path, 'utf8');
      const lines = content.split('\n');
      const entriesCount = lines.length;
      const coordinates: Coordinate[] = [];

      for await (const [index, line] of lines.entries()) {
        // Split the line into an array of values
        const values = line.split(';');
        if (!values[0]) {
          continue;
        }
        // Create an object from the values
        const coordinate: Coordinate = {
          record: values[0],
          districtCode: values[1],
          propertyId: values[2],
          saleCounter: Number(values[3]),
          downloadTime: parseDate(values[4]),
          propertyName: values[5],
          unitNumber: values[6],
          houseNumber: values[7],
          streetName: values[8],
          suburb: values[9],
          postcode: values[10],
          landSize: values[11],
          sizeMetric: values[12],
          contractDate: parseDate(values[13]),
          settlementDate: parseDate(values[14]),
          salePrice: values[15],
          zoning: values[16],
          nature: values[17],
          purpose: values[18],
          strataLot: values[19],
          componentCode: values[20],
          saleCode: values[22],
          interestOfSale: values[23],
          lat: values[24],
          long: values[25],
          address:
            (values[6] ? values[6] + '/' : '') +
            values[7] +
            ' ' +
            values[8] +
            ' ' +
            values[9] +
            ' ' +
            values[10],
        };

        console.log(`Processing ${(index / entriesCount) * 100}%`);
        // Add the object to the array
        coordinates.push(coordinate);
      }

      console.log(`Adding ${coordinates.length} document...`);
      await this.coordinateModel.insertMany(coordinates);
      return Promise.resolve();
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }
}
