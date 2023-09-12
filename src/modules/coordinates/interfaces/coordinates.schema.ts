import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoordinatesDocument = HydratedDocument<Coordinate>;

@Schema()
export class Coordinate {
  @Prop()
  record: string;
  @Prop()
  districtCode: string;
  @Prop()
  propertyId: string;
  @Prop()
  saleCounter: number;
  @Prop()
  downloadTime: Date;
  @Prop()
  propertyName: string;
  @Prop()
  unitNumber: string;
  @Prop()
  houseNumber: string;
  @Prop()
  streetName: string;
  @Prop()
  suburb: string;
  @Prop()
  postcode: string;
  @Prop()
  landSize: string;
  @Prop()
  sizeMetric: string;
  @Prop()
  contractDate: Date;
  @Prop()
  settlementDate: Date;
  @Prop()
  salePrice: string;
  @Prop()
  zoning: string;
  @Prop()
  nature: string;
  @Prop()
  purpose: string;
  @Prop()
  strataLot: string;
  @Prop()
  componentCode: string;
  @Prop()
  saleCode: string;
  @Prop()
  interestOfSale: string;
  @Prop()
  lat: string;
  @Prop()
  long: string;
  @Prop()
  address: string;
}

export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);
