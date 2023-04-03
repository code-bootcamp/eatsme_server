import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from '../auth/strategies/jwt-access.strategy';
import { ImagesService } from '../images/images.service';
import { User } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
    ImagesService,
  ],
  exports: [
    UserService, //
  ],
})
export class UserModule {}
