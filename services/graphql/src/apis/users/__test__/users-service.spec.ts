import { User } from '../entities/user.entity';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from '../users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserService } from './user-mockDB';
import {
  CacheModule,
  ConflictException,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userRepository: Repository<User>;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          url: `redis://${process.env.REDIS_DATABASE_HOST}:6379`,
          isGlobal: true,
        }),
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              service: 'Gmail',
              host: process.env.EMAIL_HOST,
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
        UserService, //
        {
          provide: getRepositoryToken(User),
          useClass: MockUserService,
        },
      ],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findOneByUser', () => {
    it('db에 등록된 회원이 아닌 경우', async () => {
      const userId = 'aaa@aaa.com';

      jest
        .spyOn(userService, 'findOneByUser')
        .mockRejectedValue(new ConflictException('등록되지 않은 회원입니다.'));
      const result = async () => await userService.findOneByUser({ userId });
      await expect(result).rejects.toThrowError(
        new ConflictException('등록되지 않은 회원입니다.'),
      );
    });

    it('db에 등록된 회원인 경우', async () => {
      const userId = 'black1594@naver.com';
      const result = new MockUserService();
      jest
        .spyOn(userService, 'findOneByUser')
        .mockImplementation(async (userId) => {
          return result.mydb[0];
        });
      expect(await userService.findOneByUser(result[0])).toBe(result.mydb[0]);
    });
  });

  describe('findOneByEmail', () => {
    it('이메일이 db에 존재하는 경우', async () => {
      const email = 'aaa@aaa.com';

      jest
        .spyOn(userService, 'findOneByEmail')
        .mockRejectedValue(
          new UnprocessableEntityException('이메일이 존재합니다.'),
        );
      const result = async () => await userService.findOneByEmail({ email });
      await expect(result).rejects.toThrowError(
        new UnprocessableEntityException('이메일이 존재합니다.'),
      );
    });

    it('이메일이 db에 존재하지 않는 경우', async () => {
      const result = new MockUserService();
      jest.spyOn(userService, 'findOneByEmail').mockImplementation(async () => {
        return null;
      });
      expect(await userService.findOneByEmail(result.mydb[0])).toBe(null);
    });
  });

  describe('checkEmail', () => {
    it('이메일 양식 값이 없는 경우', async () => {
      const email = '';
      jest
        .spyOn(userService, 'checkEmail')
        .mockRejectedValue(
          new ConflictException('제대로된 이메일을 입력해주세요'),
        );
      const result = async () => await userService.checkEmail({ email });
      await expect(result).rejects.toThrowError(
        new ConflictException('제대로된 이메일을 입력해주세요'),
      );
    });

    it('이메일 양식 30자리초과하는 경우', async () => {
      const email = 'abcdefghijklmnopqrstuvwxyz@naver.com';
      jest
        .spyOn(userService, 'checkEmail')
        .mockRejectedValue(
          new ConflictException('제대로된 이메일을 입력해주세요'),
        );
      const result = async () => await userService.checkEmail({ email });
      await expect(result).rejects.toThrowError(
        new ConflictException('제대로된 이메일을 입력해주세요'),
      );
    });

    it('이메일 양식 값이 없는 경우', async () => {
      const email = 'aaaaaa.com';
      jest
        .spyOn(userService, 'checkEmail')
        .mockRejectedValue(
          new ConflictException('제대로된 이메일을 입력해주세요'),
        );
      const result = async () => await userService.checkEmail({ email });
      await expect(result).rejects.toThrowError(
        new ConflictException('제대로된 이메일을 입력해주세요'),
      );
    });

    it('이메일 양식에 맞게 작성한 경우', async () => {
      const email = 'black1594@naver.com';
      jest.spyOn(userService, 'checkEmail').mockImplementation(async () => {
        return email;
      });
      expect(await userService.checkEmail({ email })).toBe(email);
    });
  });

  describe('isFindOneByNickname', () => {
    it('닉네임이 db에 존재하는 경우', async () => {
      const nickname = '짱구';
      jest
        .spyOn(userService, 'isFindOneByNickname')
        .mockRejectedValue(
          new ConflictException('이미 사용하고있는 닉네임입니다.'),
        );
      const result = async () =>
        await userService.isFindOneByNickname({ nickname });
      await expect(result).rejects.toThrowError(
        new ConflictException('이미 사용하고있는 닉네임입니다.'),
      );
    });

    it('닉네임 값이 주어지지않은 경우', async () => {
      const nickname = '';
      jest
        .spyOn(userService, 'isFindOneByNickname')
        .mockRejectedValue(
          new ConflictException('닉네임을 제대로 입력해주세요'),
        );
      const result = async () =>
        await userService.isFindOneByNickname({ nickname });
      await expect(result).rejects.toThrowError(
        new ConflictException('닉네임을 제대로 입력해주세요'),
      );
    });
  });
});
