import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IContext, IAuthUser } from 'src/commons/interfaces/context';
import { LoginAuthInput } from '../dto/login-auth.input';

export interface IAuthServiceLogin {
  loginAuthInput: LoginAuthInput;
  context: IContext;
}

export interface IAuthServiceLogout {
  accessToken: string;
  restoreToken: string;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceGetRefreshToken {
  user: IAuthUser['user'];
}

export interface IAuthServiceRestoreToken {
  user?: User;
  res: Response;
}
