import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'https://jjjbackendclass.shop/graphql/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      name: profile._json.properties.nickname,
      email: profile._json.kakao_account.email,
      nickname: profile._json.properties.nickname,
    };
  }
}
