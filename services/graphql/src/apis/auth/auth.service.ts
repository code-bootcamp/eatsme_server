import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });

    if (!user) {
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');
    }

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException(
        '비밀번호가 틀렸습니다. 다시 시도해주세요.',
      );
    }

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' },
    );
  }
}
