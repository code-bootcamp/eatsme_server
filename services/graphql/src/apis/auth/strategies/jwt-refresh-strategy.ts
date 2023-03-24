import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    const redisRefreshToken = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );
    if (redisRefreshToken) throw new UnauthorizedException();

    return {
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
