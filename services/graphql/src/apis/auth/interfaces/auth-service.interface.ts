import { User } from 'src/apis/users/entities/user.entity';

export class IAuthServiceLogin {
  email: string;
  password: string;
}

export class IAuthServiceGetAccessToken {
  user: User;
}
