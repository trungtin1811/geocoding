import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    CoordinatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
