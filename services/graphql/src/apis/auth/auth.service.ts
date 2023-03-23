import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceGetRefreshToken,
  IAuthServiceLogin,
  IAuthServiceLogout,
  IAuthServiceRestoreToken,
} from './interfaces/auth-service.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService, //
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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

    this.restoreAccessToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }

  async logout({
    accessToken,
    restoreToken,
  }: IAuthServiceLogout): Promise<string> {
    const isAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    const isRefreshToken = jwt.verify(
      restoreToken,
      process.env.JWT_RESTORE_KEY,
    );
    console.log(
      isAccessToken[0]['exp'],
      isAccessToken[0]['iat'],
      '@@@@@@@@@@@',
    );
    await this.cacheManager.set(`accessToken:${accessToken}`, accessToken, {
      ttl: isAccessToken[0]['exp'] - isAccessToken[0]['iat'],
    });
    await this.cacheManager.set(`refreshToken:${restoreToken}`, restoreToken, {
      ttl: isRefreshToken[1]['exp'] - isRefreshToken[1]['iat'],
    });

    return '로그아웃이 되었습니다.';
  }

  restoreAccessToken({ user, res }: IAuthServiceRestoreToken): void {
    const restoreToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_RESTORE_KEY, expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `restoreToken=${restoreToken};path=/`);
  }

  refreshAccessToken({ user }: IAuthServiceGetRefreshToken): string {
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '4h' },
    );
  }
}
