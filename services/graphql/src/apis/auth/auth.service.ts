import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceGetRefreshToken,
  IAuthServiceIsToken,
  IAuthServiceLogin,
  IAuthServiceLogout,
  IAuthServiceSetRefreshToken,
  IAuthServiceSocialLogin,
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
    this.setRefreshToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }

  async isToken({ token }: IAuthServiceIsToken): Promise<Object> {
    try {
      for (let i in token) {
        if (i === 'access') {
          return jwt.verify(token.access, process.env.JWT_ACCESS_KEY);
        } else return jwt.verify(token.refresh, process.env.JWT_REFRESH_KEY);
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }

  async logout({
    accessToken,
    refreshToken,
  }: IAuthServiceLogout): Promise<string> {
    const token = [accessToken, refreshToken];
    const result = await Promise.all(
      token.map((el) => this.isToken({ token: el })),
    );

    const isAccessToken = await this.cacheManager.set(
      `accessToken:${accessToken.access}`,
      'accessToken',
      {
        ttl: result[1]['exp'] - Math.trunc(Date.now() / 1000),
      },
    );
    console.log(result);

    const isRefreshToken = await this.cacheManager.set(
      `refreshToken:${refreshToken.refresh}`,
      'refreshToken',
      {
        ttl: result[0]['exp'] - Math.trunc(Date.now() / 1000),
      },
    );

    console.log(isAccessToken, isRefreshToken, '@@@');

    return '로그아웃';
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    res.setHeader(
      'Access-Control-Allow-Origin', process.env.ORIGIN2,
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken};path=/ domain=.jjjbackendclass.shop; SameSite=None; Secure; httpOnly`,
    );
  }

  restoreAccessToken({ user }: IAuthServiceGetRefreshToken): string {
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' },
    );
  }

  async socialLogin({ req, res }: IAuthServiceSocialLogin) {
    console.log(req, res);
    let user = await this.usersService.isFindOneByEmail({
      email: req.user.email,
    });

    if (!user) {
      user = await this.usersService.createUser({
        createUserInput: req.user,
      });
    }
    // console.log(user);
    this.setRefreshToken({ user, res });
    res.redirect('http://local:5500/seb11_team03_server/index.html');
  }
}
