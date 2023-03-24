import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const redisAccessTokne = await this.cacheManager.get(
      `accessToken : ${accessToken}`,
    );
    if (redisAccessTokne) throw new UnauthorizedException();
    return {
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
