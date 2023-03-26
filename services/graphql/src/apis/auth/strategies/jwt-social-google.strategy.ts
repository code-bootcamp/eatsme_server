import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost/graphql/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(profile: Profile) {
    // console.log('$$$', profile);

    console.log(
      '###',
      {
        name: profile.displayName,
        email: profile._json.email,
        nickname: profile._json.given_name,
      },
      '#####',
    );

    return {
      name: profile.displayName,
      email: profile._json.email,
      nickname: profile._json.given_name,
    };
  }
}
