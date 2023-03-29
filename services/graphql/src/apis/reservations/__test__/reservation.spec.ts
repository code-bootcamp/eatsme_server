import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
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
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MockingReservationService } from './reservation-service.mock';
import { IContext } from 'src/commons/interfaces/context';
import { MockIContext } from 'src/commons/__test__/IContext.mock.inferface';

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

describe('ReservationResolver', () => {
  let reservationsRepository: Repository<Reservation>;
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
    reservationsRepository = moduleRef.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  describe('예약기능', () => {
    it('예약 하기 정상작동', async () => {
      const createReservationinput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: restaurant[0]._id,
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
        restaurantId: '1f440225-d3e1-495b-a94e-874f7750d3cd',
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
  });
});
