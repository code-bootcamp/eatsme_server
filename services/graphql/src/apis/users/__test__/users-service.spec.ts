import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IUsersCreate } from '../interfaces/user-service.interface';
import { UserService } from '../users.service';
import { MockUserService } from './user-mockDB';
import { ConfigModule } from '@nestjs/config';

import { ImagesService } from 'src/apis/images/images.service';
import { MatchAuthNumberInput } from '../dto/matchAuthNumber-user.input';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduelRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              service: 'Gmail',
              host: process.env.DATABASE_HOST,
              port: Number(process.env.DATABASE_PORT),
              secure: false, // upgrade later with STARTTLS
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              },
            },
          }),
        }),
        CacheModule.register(),
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserService,
        },
        ImagesService,
      ],
    }).compile();

    userService = moduelRef.get<UserService>(UserService);
  });

  describe('checkEmail', () => {
    it('이메일 양식 값이 주어지지 않았을 때', async () => {
      const email = '';
      try {
        await userService.checkEmail({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 글자수 30개초과 에러', async () => {
      const email = 'abcdefghijklmnopqrstuvwxyz@naver.com';

      try {
        await userService.checkEmail({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 @ 유무 에러', async () => {
      const email = 'black1594naver.com';

      try {
        await userService.checkEmail({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('db에 있는 이메일 입력했을 때', async () => {
      const email = 'aaa@aaa.com';

      try {
        await userService.checkEmail({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('db에 없는 이메일 입력했을 때', async () => {
      const email = 'black1594@naver.com';

      const result = await userService.checkEmail({ email });
      expect(result).toBe(email);
    });
  });

  describe('findOneByEmail', () => {
    it('db에 없는 EMail 입력 했을 때', () => {
      const email = 'black1594@naver.com';

      try {
        userService.findOneByEmail({ email });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('db에 있는 EMail 입력 했을 때', async () => {
      const email = 'aaa@aaa.com';

      const result = await userService.findOneByEmail({ email });
      expect(result.email).toBe(email);
    });
  });

  // describe('matchAuthNumber', async () => {
  //   it('인증번호 못맞췄을 경우', () => {
  //     const mydata: MatchAuthNumberInput = {
  //       email: 'black1594@naver.com',
  //       authNumber: '123456',
  //     };

  //     try {
  //       //
  //     } catch (err) {
  //       expect(err).toBeInstanceOf(ConflictException);
  //     }
  //   });
  // });

  describe('isFindOneByNickname', () => {
    it('닉네임 값을 입력 안한 경우', async () => {
      const nickname = '';

      try {
        await userService.isFindOneByNickname({ nickname });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('닉네임 db 유무확인', async () => {
      const nickname = '짱구';

      try {
        await userService.isFindOneByNickname({ nickname });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('닉네임 값을 입력 한 경우 ', async () => {
      const nickname = '짱아';

      const result = await userService.isFindOneByNickname({ nickname });
      expect(result).toBe(null);
    });
  });

  describe('createUser', () => {
    it('이메일 양식 값이 주어지지 않았을 때', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: '',
          password: '12341234',
          nickname: '짱아',
        },
      };

      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 글자수 30개초과 에러', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'abcdefghijklmnopqrstuvwxyz@naver.com',
          password: '12341234',
          nickname: '짱아',
        },
      };
      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 @ 유무 에러', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'black1594naver.com',
          password: '12341234',
          nickname: '짱아',
        },
      };

      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('db에 있는 이메일 입력했을 때', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'aaa@aaa.com',
          password: '12341234',
          nickname: '짱아',
        },
      };
      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('닉네임 db 유무확인', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'black1594@naver.com',
          password: '12341234',
          nickname: '짱구',
        },
      };

      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('닉네임 값을 입력 안한 경우', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'black1594@naver.com',
          password: '12341234',
          nickname: '',
        },
      };

      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('비밀번호 값을 입력 안한 경우', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'black1594@naver.com',
          password: '',
          nickname: '짱아',
        },
      };

      try {
        await userService.createUser({ ...mydata });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일,닉네임 양식 통과, db에 없는경우', async () => {
      const mydata: IUsersCreate = {
        createUserInput: {
          email: 'black1594@naver.com',
          password: 'qwe12341234',
          nickname: '짱아',
        },
      };
      const mockUserService = new MockUserService();
      const result = await userService.createUser({ ...mydata });

      expect(result).toEqual(mockUserService.save(result));
    });
  });
});
