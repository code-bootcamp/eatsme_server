import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRestoreAccessStrategy extends PassportStrategy(
  Strategy,
  'restore',
) {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const restoreAccessToken = cookie.replace('restoreToken=', '');
        return restoreAccessToken;
      },
      secretOrKey: process.env.JWT_RESTORE_KEY,
    });
  }

  async validate(req, payload) {
    const restoreToken = req.headers.cookie.replace('restoreToken=', '');
    const redisRestoreToken = await this.cacheManager.get(
      `restoreToken':${restoreToken}`,
    );
    if (redisRestoreToken) throw new UnauthorizedException();
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
