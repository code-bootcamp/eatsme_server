import { CreateUserInput } from '../entities/dto/create-user.input';

export interface IUserFindOneByUser {
  userId: string;
}

export interface IUsersCheckEmailAndFindOneByEmail {
  email: string;
}

export interface IUsersFindOneByNickname {
  nickname: string;
}

export interface IUsersCreate {
  createUserInput: CreateUserInput;
}

export interface IUpdateUserServiceInput {
  userId: string;
  password: string;
  userImg: string;
}
