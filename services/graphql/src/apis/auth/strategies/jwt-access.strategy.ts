import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject()
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async svalidate(req, payload) {
    const accessToken = req.headers.authorization.split(' ')[1];
    const redisAccessToken = await this.cacheManager.get(
      `accessToken:${accessToken}`,
    );
    if (redisAccessToken) throw new UnauthorizedException();
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
