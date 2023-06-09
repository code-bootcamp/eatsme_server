import { Response, Request } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IContext, IAuthUser } from 'src/commons/interfaces/context';
import { LoginAuthInput } from '../dto/login-auth.input';

export interface IAuthServiceLogin {
  loginAuthInput: LoginAuthInput;
  context: IContext;
}

export interface IAuthServiceIsToken {
  token: {
    access?: string;
    refresh?: string;
  };
}

export interface IAuthServiceLogout {
  accessToken: {
    access: string;
  };
  refreshToken: {
    refresh: string;
  };
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceGetRefreshToken {
  user: IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user?: User;
  res: Response;
}

export interface IOAuthUser {
  user: {
    email: string;
    password: string;
    nickname: string;
  };
}

export interface IAuthServiceSocialLogin {
  req: Request & IOAuthUser;
  res: Response;
}
