import { MailerModule } from '@nestjs-modules/mailer';
import {
  CacheModule,
  ConflictException,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { UserService } from 'src/apis/users/users.service';
import { Reservation } from '../entities/reservation.entity';
import { ReservationsService } from '../reservation.service';
import {
  MockReservationsRepository,
  MockRestaurantRepository,
  MockUserRepository,
} from './reservation-mock.DB';
import axios from 'axios';

jest.mock('axios');

const userId = new MockUserRepository().database[0].id;
const user = new MockUserRepository();
const { restaurant } = new MockRestaurantRepository();

const expectedData = {
  restaurantInfo: {
    _id: '1f440225-d3e1-495b-a94e-874f7750d3cd',
    name: 'Test Restaurant',
    address: '123 Main St',
  },
};

describe('reservationService', () => {
  let reservationService: ReservationsService;

  beforeEach(async () => {
    const mockModule: TestingModule = await Test.createTestingModule({
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
        ReservationsService, //
        UserService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: MockReservationsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    reservationService =
      mockModule.get<ReservationsService>(ReservationsService);
  });

  (axios.get as jest.Mock).mockResolvedValue({
    data: expectedData,
  });

  describe('예약 등록하기', () => {
    it('예약 하기 정상작동', async () => {
      const createReservationInput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '1f440225-d3e1-495b-a94e-874f7750d3cd',
        division: restaurant[0].section,
      };

      const result = await reservationService.createReservation({
        createReservationInput,
        userId,
      });
      delete createReservationInput.restaurantId;
      delete createReservationInput.division;
      createReservationInput['restaurant_id'] = restaurant[0]._id;

      expect(result).toStrictEqual({
        id: '임의아이디',
        ...createReservationInput,
        users: { ...user.database[0], restaurant: { ...expectedData } },
      });
    });

    it('한 유저가 같은 식당,시간에 예약할려고 할때 에러처리', async () => {
      const createReservationInput = {
        table: 1,
        reservation_time: 1,
        time: '2023-03-31',
        restaurantId: '05858a63-qwer-4e21-8933-d7cbefb661dc',
        division: restaurant[0].section,
      };
      try {
        await reservationService.createReservation({
          createReservationInput,
          userId,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });

  describe('예약 삭제하기', () => {
    it('예약한 유저가 예약 취소, 정상작동', async () => {
      const expectedData = {
        data: true,
      };
      const restaurant_id = '05858a63-3ae9-4e21-8933-d7cbefb661dc';

      (axios.delete as jest.Mock).mockResolvedValue({
        data: expectedData,
      });

      const result = await reservationService.deleteReservation({
        restaurant_id,
        userId,
      });

      expect(result).toBe(true);
    });

    it('예약한 정보가 존재하지 않을떄', async () => {
      const restaurant_id = '임의 아이디';

      try {
        await reservationService.deleteReservation({ restaurant_id, userId });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
