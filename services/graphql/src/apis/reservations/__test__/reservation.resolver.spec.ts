import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationsResolver } from '../reservation.resolver';
import { ReservationsService } from '../reservation.service';
import {
  MockReservationsRepository,
  MockRestaurantRepository,
  MockUserRepository,
} from './reservation-mock.DB';
import {
  CacheModule,
  ConflictException,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MockingReservationService } from './reservation-service.mock';
import { IContext } from 'src/commons/interfaces/context';
import { MockIContext } from 'src/commons/__test__/IContext.mock.inferface';
import { User } from 'src/apis/users/entities/user.entity';
import axios from 'axios';

jest.mock('axios');

// 공통된 데이터
const user = new MockUserRepository();
const context: IContext = {
  req: {
    user: {
      id: user.database[0].id,
    },
  },
} as MockIContext;
const { restaurant } = new MockRestaurantRepository();

const expectedData = {
  restaurantInfo: {
    _id: '1f440225-d3e1-495b-a94e-874f7750d3cd',
    name: 'Test Restaurant',
    address: '123 Main St',
  },
};
describe('ReservationResolver', () => {
  let reservationsResolver: ReservationsResolver;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
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
        ReservationsResolver,
        {
          provide: getRepositoryToken(Reservation),
          useClass: MockReservationsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: ReservationsService,
          useClass: MockingReservationService,
        },
      ],
    }).compile();

    reservationsResolver =
      moduleRef.get<ReservationsResolver>(ReservationsResolver);
  });

  (axios.get as jest.Mock).mockResolvedValue({
    data: expectedData,
  });

  describe('예약 등록하기', () => {
    it('예약 하기 정상작동', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '1f440225-d3e1-495b-a94e-874f7750d3cd',
        division: restaurant[0].section,
      };

      const result = await reservationsResolver.createReservation(
        createReservationinput,
        context,
      );
      delete createReservationinput.restaurantId;
      delete createReservationinput.division;
      createReservationinput['restaurant_id'] = restaurant[0]._id;

      expect(result).toStrictEqual({
        id: '임의아이디',
        ...createReservationinput,
        users: { ...user.database[0] },
      });
    });

    it('한 유저가 같은 식당,시간에 예약할려고 할때 에러처리', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '05858a63-qwer-4e21-8933-d7cbefb661dc',
        division: restaurant[0].section,
      };
      try {
        await reservationsResolver.createReservation(
          createReservationinput,
          context,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('존재하지 않는 식당에 예약할려고 할때', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '임의 식당',
        division: restaurant[0].section,
      };
      try {
        await reservationsResolver.createReservation(
          createReservationinput,
          context,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('남은 테이블이 없을때', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '05858a63-aaaa-4e21-8933-d7cbefb661dc',
        division: restaurant[0].section,
      };
      try {
        await reservationsResolver.createReservation(
          createReservationinput,
          context,
        );
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    }),
      it('존재하지 회원', async () => {
        const context: IContext = {
          req: {
            user: {
              id: '임의 아이디',
            },
          },
        } as MockIContext;

        const createReservationinput = {
          table: 1,
          reservation_time: 1,
          time: '2023-03-31',
          restaurantId: '1f440225-d3e1-495b-a94e-874f7750d3cd',
          division: restaurant[0].section,
        };
        try {
          await reservationsResolver.createReservation(
            createReservationinput,
            context,
          );
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
  });

  describe('예약 삭제하기', () => {
    it('예약한 유저가 예약 취소, 정상작동', async () => {
      const expectedData = {
        data: true,
      };
      const restaurantId = '05858a63-3ae9-4e21-8933-d7cbefb661dc';

      (axios.delete as jest.Mock).mockResolvedValue({
        data: expectedData,
      });

      const result = await reservationsResolver.deleteReservation(
        restaurantId,
        context,
      );

      expect(result).toBe(true);
    });

    it('예약한 정보가 존재하지 않을떄', async () => {
      const restaurantId = '임의 아이디';

      try {
        await reservationsResolver.deleteReservation(restaurantId, context);
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('예약정보가 없을떄', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '0b8f8a92-67fa-480d-93ed-057401790551',
        division: restaurant[0].section,
      };
      try {
        await reservationsResolver.createReservation(
          createReservationinput,
          context,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
