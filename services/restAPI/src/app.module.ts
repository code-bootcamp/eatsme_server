import { CacheModule, Module } from '@nestjs/common';
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
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: `redis://${process.env.REDIS_DATABASE_HOST}:6379`,
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController, //
  ],
  providers: [
    AppService, //
  ],
})
export class AppModule {}
