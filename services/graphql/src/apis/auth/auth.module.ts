import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    UserModule,
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
