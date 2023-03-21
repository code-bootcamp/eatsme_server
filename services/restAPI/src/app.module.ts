import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './apis/restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MY_MONGODB), //
  ],
  controllers: [
    AppController, //
  ],
  providers: [
    AppService, //
  ],
})
export class AppModule {}
