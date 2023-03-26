import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost/graphql/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(profile: Profile) {
    console.log('$$$', profile);

    console.log(
      '@@@@@',
      {
        name: profile._json.properties.nickname,
        email: profile._json.kakao_account.email,
        nickname: profile._json.properties.nickname,
      },
      '@@@@@',
    );
    return {
      name: profile._json.properties.nickname,
      email: profile._json.kakao_account.email,
      nickname: profile._json.properties.nickname,
    };
  }
}
