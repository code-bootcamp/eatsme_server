import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';
import { ImagesModule } from '../images/images.module';
import { ImagesService } from '../images/images.service';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [
    ImagesModule,
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    UserResolver, //
    UserService,
  ],
  exports: [
    UserService, //
  ],
})
export class UserModule {}
