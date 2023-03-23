import { ForbiddenException, HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, MongooseError } from 'mongoose';
import { RestaurantController } from '../restaurant.controller';
import { RestaurantService } from '../restaurant.service';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schemas';

describe('RestaurantController', () => {
  let restaurantModel: Model<RestaurantDocument>;
  let restaurantController: RestaurantController;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        RestaurantController, //
      ],
      providers: [
        RestaurantService, //
        {
          provide: getModelToken('Restaurant'),
          useValue: Model<RestaurantDocument>,
        },
      ],
    }).compile();
    restaurantService = moduleRef.get<RestaurantService>(RestaurantService);
    restaurantController =
      moduleRef.get<RestaurantController>(RestaurantController);
    restaurantModel = moduleRef.get<Model<RestaurantDocument>>(
      getModelToken('Restaurant'),
    );
  });
  describe('getRestaurants', () => {
    it('등록된 행정구역인 경우 추천 식당목록의 정보를 반환한다.', async () => {
      const result = [
        {
          _id: '641a99d0a08af8b1067f88aa',
          section: '서울시 종로구',
          restaurantName: '헤비스테이크 종로구청점',
          address: '대한민국 서울특별시 종로구 삼봉로 42',
          location: {
            lat: 37.572337,
            lng: 126.9795505,
          },
          userRatingsTotal: '1923',
          phoneNumber: '02-733-3309',
          openingHours: [
            '월요일: 오전 11:00 ~ 오후 9:00',
            '화요일: 오전 11:00 ~ 오후 9:00',
            '수요일: 오전 11:00 ~ 오후 9:00',
            '목요일: 오전 11:00 ~ 오후 9:00',
            '금요일: 오전 11:00 ~ 오후 9:00',
            '토요일: 오전 11:00 ~ 오후 9:00',
            '일요일: 오전 11:00 ~ 오후 9:00',
          ],
          rating: '4.8',
          __v: 0,
        },
        {
          _id: '641a99d0a08af8b1067f88ad',
          section: '서울시 종로구',
          restaurantName: '질할브로스 디타워점',
          address:
            'D Tower, Soho Street, 17 종로3길 종로구 서울특별시 대한민국',
          location: {
            lat: 37.570528,
            lng: 126.9789736,
          },
          userRatingsTotal: '30',
          phoneNumber: '02-2251-8122',
          openingHours: [
            '월요일: 오전 11:00 ~ 오후 10:00',
            '화요일: 오전 11:00 ~ 오후 10:00',
            '수요일: 오전 11:00 ~ 오후 10:00',
            '목요일: 오전 11:00 ~ 오후 10:00',
            '금요일: 오전 11:00 ~ 오후 10:00',
            '토요일: 오전 11:00 ~ 오후 10:00',
            '일요일: 오전 11:00 ~ 오후 10:00',
          ],
          rating: '4.5',
          __v: 0,
        },
        {
          _id: '641a99d0a08af8b1067f88b0',
          section: '서울시 종로구',
          restaurantName: '슈가스컬 종로점',
          address: '대한민국 8F~9F 종로구 관철동 18-10 KR 서울특별시',
          location: {
            lat: 37.5696352,
            lng: 126.9847142,
          },
          userRatingsTotal: '102',
          phoneNumber: '050-71442-8704',
          openingHours: [
            '월요일: 오전 11:00 ~ 오후 10:00',
            '화요일: 오전 11:00 ~ 오후 10:00',
            '수요일: 오전 11:00 ~ 오후 10:00',
            '목요일: 오전 11:00 ~ 오후 10:00',
            '금요일: 오전 11:00 ~ 오후 10:00',
            '토요일: 오전 11:00 ~ 오후 10:00',
            '일요일: 오전 11:00 ~ 오후 10:00',
          ],
          rating: '4.5',
          __v: 0,
        },
        {
          _id: '641a99d0a08af8b1067f88b3',
          section: '서울시 종로구',
          restaurantName: '엘샌드위치',
          address: '대한민국 서울특별시 종로구 율곡로4길 14',
          location: {
            lat: 37.5750186,
            lng: 126.981752,
          },
          userRatingsTotal: '79',
          phoneNumber: '02-723-2589',
          openingHours: [
            '월요일: 오전 9:00 ~ 오후 9:00',
            '화요일: 오전 9:00 ~ 오후 9:00',
            '수요일: 오전 9:00 ~ 오후 9:00',
            '목요일: 오전 9:00 ~ 오후 9:00',
            '금요일: 오전 9:00 ~ 오후 9:00',
            '토요일: 오전 10:00 ~ 오후 9:00',
            '일요일: 오전 10:00 ~ 오후 9:00',
          ],
          rating: '4.6',
          __v: 0,
        },
        {
          _id: '641a99d0a08af8b1067f88b6',
          section: '서울시 종로구',
          restaurantName: '스페이스오',
          address:
            '대한민국 KR 서울특별시 종로구 인사동길 49 나인트리호텔 스페이스오 12층',
          location: {
            lat: 37.5746689,
            lng: 126.9831217,
          },
          userRatingsTotal: '43',
          phoneNumber: '02-737-4222',
          openingHours: [
            '월요일: 오전 11:00 ~ 오후 11:00',
            '화요일: 오전 11:00 ~ 오후 11:00',
            '수요일: 오전 11:00 ~ 오후 11:00',
            '목요일: 오전 11:00 ~ 오후 11:00',
            '금요일: 오전 11:00 ~ 오후 11:00',
            '토요일: 오전 11:00 ~ 오후 11:00',
            '일요일: 휴무일',
          ],
          rating: '4.5',
          __v: 0,
        },
        {
          _id: '641a99d3a08af8b1067f88b9',
          section: '서울시 종로구',
          restaurantName: '장가네',
          address: '대한민국 서울특별시 종로구 중학동 종로1길 57',
          location: {
            lat: 37.5754026,
            lng: 126.9789565,
          },
          userRatingsTotal: '47',
          phoneNumber: '02-732-7522',
          openingHours: [
            '월요일: 오전 11:00 ~ 오후 9:00',
            '화요일: 오전 11:00 ~ 오후 9:00',
            '수요일: 오전 11:00 ~ 오후 9:00',
            '목요일: 오전 11:00 ~ 오후 9:00',
            '금요일: 오전 11:00 ~ 오후 9:00',
            '토요일: 오전 11:00 ~ 오후 9:00',
            '일요일: 오전 11:00 ~ 오후 9:00',
          ],
          rating: '4.6',
          __v: 0,
        },
        {
          _id: '641a99d3a08af8b1067f88bc',
          section: '서울시 종로구',
          restaurantName: '암소서울',
          address: '대한민국 서울특별시 종로구 신문로1가 새문안로 76 B1',
          location: {
            lat: 37.5697911,
            lng: 126.9728243,
          },
          userRatingsTotal: '231',
          phoneNumber: '02-6744-0123',
          openingHours: [
            '월요일: 오전 11:30 ~ 오후 10:00',
            '화요일: 오전 11:30 ~ 오후 10:00',
            '수요일: 오전 11:30 ~ 오후 10:00',
            '목요일: 오전 11:30 ~ 오후 10:00',
            '금요일: 오전 11:30 ~ 오후 10:00',
            '토요일: 오전 11:00 ~ 오후 10:00',
            '일요일: 오전 11:00 ~ 오후 10:00',
          ],
          rating: '4.6',
          __v: 0,
        },
        {
          _id: '641a99d3a08af8b1067f88bf',
          section: '서울시 종로구',
          restaurantName: '온지음',
          address: '대한민국 서울특별시 종로구 효자로 49 4층',
          location: {
            lat: 37.5804867,
            lng: 126.9733488,
          },
          userRatingsTotal: '80',
          phoneNumber: '02-6952-0024',
          openingHours: [
            '월요일: 휴무일',
            '화요일: 오후 12:00~10:00',
            '수요일: 오후 12:00~10:00',
            '목요일: 오후 12:00~10:00',
            '금요일: 오후 12:00~10:00',
            '토요일: 휴무일',
            '일요일: 휴무일',
          ],
          rating: '4.7',
          __v: 0,
        },
      ];
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockImplementation(async ({ body }): Promise<Restaurant[]> => {
          return result;
        });
      expect(await restaurantController.getRestaurants(body)).toBe(result);
    });

    // it('등록되지 않은 행정구역인 경우 에러를 던진다.', async () => {
    //   const body = '서울시 잇츠미구';
    //   try {
    //     await restaurantController.getRestaurants(body);
    //   } catch (error) {
    //     console.log(error);
    //     expect(error).toBeInstanceOf(HttpException);
    //   }
    // });
  });
  describe('deleteRestaurant', () => {
    it('발급받은 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
      const result = '정상적으로 지워졌습니다.';
      const body = '64194481b8388f33864812b7';
      jest
        .spyOn(restaurantService, 'deleteCollection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantController.deleteRestaurant(body)).toBe(result);
    });
    it('이미 지워진 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
      const result = '이미 지워진 collection입니다.';
      const body = '64194481b8388f33864812bc';
      jest
        .spyOn(restaurantService, 'deleteCollection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantController.deleteRestaurant(body)).toBe(result);
    });
    // it('잘못된 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
    //   const body =
    //     '64194481b8388f33864812b잘못된경우 길거나 짧은 경우 없는 아이디 입력한 경우';
    //   jest.spyOn(restaurantService, 'deleteCollection');

    //   await expect(async () => {
    //     await restaurantController.deleteRestaurant(body);
    //   }).rejects.toThrowError(HttpException);
    // });
  });
});
