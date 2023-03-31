import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

class GoogleAuthGuard extends AuthGuard('google') {}
class KakaoAuthGuard extends AuthGuard('kakao') {}

const googleAuthGuard = new GoogleAuthGuard();
const kakaoAuthGuard = new KakaoAuthGuard();

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    if (social === 'google') {
      return googleAuthGuard.canActivate(context);
    }
    if (social === 'kakao') {
      return kakaoAuthGuard.canActivate(context);
    }
  }
}
