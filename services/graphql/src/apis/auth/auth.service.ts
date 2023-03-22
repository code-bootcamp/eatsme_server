import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRefreshToken,
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ loginAuthInput, context }: IAuthServiceLogin): Promise<string> {
    const { email, password } = loginAuthInput;
    const user = await this.usersService.findOneByEmail({ email });

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException(
        '비밀번호가 틀렸습니다. 다시 시도해주세요.',
      );
    }

    this.refreshToken({ user, res: context.res });

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' },
    );
  }

  refreshToken({ user, res }: IAuthServiceRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '3h' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
}
