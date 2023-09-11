import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoordinatesController } from './controllers/coordinates.controller';
import { Coordinate, CoordinateSchema } from './interfaces/coordinates.schema';
import { CoordinatesService } from './services/coordinates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Coordinate.name, schema: CoordinateSchema },
    ]),
  ],
  controllers: [CoordinatesController],
  providers: [CoordinatesService],
})
export class CoordinatesModule {}
