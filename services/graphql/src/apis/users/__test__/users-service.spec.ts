import { MailerModule } from '@nestjs-modules/mailer';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../users.service';

class MockUserService {
  mydb = [
    { email: 'aaa@aaa.com', password: '12341234', nickname: '짱구' },
    { email: 'qqq@qqq.com', password: '1q2w3e4r', nickname: '철수' },
  ];
  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }
  save({ email, password, nickname }) {
    this.mydb.push({ email, password, nickname });
    return { email, password, nickname };
  }
}

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      imports: [
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
      ],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserService,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
  });

  describe('checkEmail', () => {
    it('이메일 양식 빈칸일 때 에러', async () => {
      const myData = {
        email: '',
      };
      try {
        await userService.checkEmail({ ...myData });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 전부 갖추었을때 ', async () => {
      const myData = {
        email: 'black1594@naver.com',
      };

      const result = await userService.checkEmail({ ...myData });
      expect(result).toBe('black1594@naver.com');
    });

    it('이메일 양식 글자수 30개초과 에러', async () => {
      const myData = {
        email: 'abcdefghijklmnopqrstuvwxyz@naver.com',
      };
      try {
        await userService.checkEmail({ ...myData });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 전부 갖추었을때 ', async () => {
      const myData = {
        email: 'black1594@gmail.com',
      };

      const result = await userService.checkEmail({ ...myData });
      expect(result).toBe('black1594@gmail.com');
    });

    it('이메일 양식 @ 유무 에러', async () => {
      const myData = {
        email: 'black1594naver.com',
      };
      try {
        await userService.checkEmail({ ...myData });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('이메일 양식 전부 갖추었을때 ', async () => {
      const myData = {
        email: 'black1594@naver.com',
      };

      const result = await userService.checkEmail({ ...myData });
      expect(result).toBe('black1594@naver.com');
    });

    it('db에 있는 이메일 입력했을 때', async () => {
      const myData = {
        email: 'aaa@aaa.com',
      };
      try {
        await userService.checkEmail({ ...myData });
      } catch (err) {
        expect(err).toBeInstanceOf(ConflictException);
      }
    });

    it('db에 없는 이메일 입력했을 때', async () => {
      const myData = {
        email: 'black1594@naver.com',
      };

      const result = await userService.checkEmail({ ...myData });
      expect(result).toBe('black1594@naver.com');
    });

    // describe('isValidNickname', () => {
    //   it('닉네임 db 유무확인', async () => {
    //     const myData = {
    //       nickname: '짱구',
    //    aaa@aaa.com };

    //     try {
    //       await userService.isFindOneByNickname({ ...myData });
    //     } catch (err) {
    //       expect(err).toBeInstanceOf(ConflictException);
    //     }
    //   });
  });
});
