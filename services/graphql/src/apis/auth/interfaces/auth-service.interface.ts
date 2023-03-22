import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';
import { LoginAuthInput } from '../dto/login-auth.input';

export interface IAuthServiceLogin {
  loginAuthInput: LoginAuthInput;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}

export interface IAuthServiceRefreshToken {
  user: User;
  res: Response;
}
