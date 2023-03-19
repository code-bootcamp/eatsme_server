import { CreateUserInput } from '../entities/dto/create-user.input';

export interface IUsersCheckEmail {
  email: string;
}

export interface IUsersFindOneByEmail {
  email: string;
}

export interface IUsersFindOneByNickname {
  nickname: string;
}

export interface IUsersCreate {
  createUserInput: CreateUserInput;
}
