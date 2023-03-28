import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUserFindOneByUser {
  userId: string;
}

export interface IUsersCheckEmail {
  email: string;
}

export interface IUsersFindOneByEmail {
  email: string;
}

export interface IUsersCheckNickname {
  nickname: string;
}

export interface IUsersSendToTemplate {
  email: string;
}

export interface IUsersFindOneByNickname {
  nickname: string;
}

export interface IUsersCreate {
  createUserInput: CreateUserInput;
}

export interface IUsersUpdate {
  updateUserInput: UpdateUserInput;
  userId: string;
}

export interface IUpdateUserServiceInput {
  userId: string;
  password: string;
  userImg: string;
}
