import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { UserService } from 'src/apis/users/users.service';
import { getRepository, Repository } from 'typeorm';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { MockAuthService } from './auth-mockDB';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({}), //]
      ],

      providers: [
        AuthService, //
        {
          provide: getRepositoryToken(User),
          useClass: MockAuthService,
        },
        UserService,
       
      ],
      controllers: [
        AuthController, //
      ],
    }).compile();
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('로그인시 아이디가 db에 있는지 확인', async () => {
      //
    });
  });
});
