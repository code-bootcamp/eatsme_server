import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { IRestaurantServicePostAndGetRestaurant } from '../interfaces/restaurantService.interface';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../schemas/restaurant.schemas';

class MockRestaurantModel {
  Restaurants = [
    {
      _id: '641834ae9da04d592a52b9ec',
      section: '서울시 강남구',
      name: '반주79',
      address:
        '대한민국 KR 서울특별시 강남구 KR 서울특별시 강남구 논현동 242-14번지 1층 GOOD',
      location: {
        lat: 37.5155988,
        lng: 127.0408291,
      },
      userRatingsTotal: '18',
      phoneNumber: '010-9361-6736',
      openingHours: [
        '월요일: 오후 3:00 ~ 오전 12:00',
        '화요일: 오후 3:00 ~ 오전 12:00',
        '수요일: 오후 3:00 ~ 오전 12:00',
        '목요일: 오후 3:00 ~ 오전 12:00',
        '금요일: 오후 3:00 ~ 오전 12:00',
        '토요일: 오후 3:00 ~ 오전 12:00',
        '일요일: 휴무일',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '641834ae9da04d592a52b9ee',
      section: '서울시 강남구',
      name: '파씨오네',
      address: '대한민국 서울특별시 강남구 신사동 언주로164길 39',
      location: {
        lat: 37.5254139,
        lng: 127.0367083,
      },
      userRatingsTotal: '427',
      phoneNumber: '02-546-7719',
      openingHours: [
        '월요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '화요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '수요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '목요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '금요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '토요일: 오후 12:00~3:00, 오후 6:00~10:30',
        '일요일: 휴무일',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '641834ae9da04d592a52b9f0',
      section: '서울시 강남구',
      name: '무오키',
      address: '대한민국 서울특별시 강남구 학동로55길 12-12',
      location: {
        lat: 37.5189698,
        lng: 127.0422219,
      },
      userRatingsTotal: '276',
      phoneNumber: '010-2948-4171',
      openingHours: [
        '월요일: 오후 12:00~10:00',
        '화요일: 오후 12:00~10:00',
        '수요일: 오후 12:00~10:00',
        '목요일: 오후 12:00~10:00',
        '금요일: 오후 12:00~10:00',
        '토요일: 오후 12:00~10:00',
        '일요일: 휴무일',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '6418354b3a9bde328969b3f2',
      section: '서울시 강남구',
      name: '비노쿠스테이블',
      address: '대한민국 서울특별시 강남구 논현동 247-7',
      location: {
        lat: 37.5141083,
        lng: 127.0374132,
      },
      userRatingsTotal: '14',
      phoneNumber: '070-8807-2477',
      openingHours: [
        '월요일: 오후 5:00 ~ 오전 12:00',
        '화요일: 오후 5:00 ~ 오전 12:00',
        '수요일: 오후 5:00 ~ 오전 12:00',
        '목요일: 오후 5:00 ~ 오전 12:00',
        '금요일: 오후 5:00 ~ 오전 12:00',
        '토요일: 오후 5:00 ~ 오전 12:00',
        '일요일: 휴무일',
      ],
      rating: '4.6',
      __v: 0,
    },
    {
      _id: '6418354b3a9bde328969b3f4',
      section: '서울시 강남구',
      name: '더그린테이블',
      address: '대한민국 서울특별시 강남구 선릉로155길 13 2층',
      location: {
        lat: 37.525291,
        lng: 127.038573,
      },
      userRatingsTotal: '79',
      phoneNumber: '02-591-2672',
      openingHours: [
        '월요일: 오후 12:00~10:00',
        '화요일: 오후 12:00~10:00',
        '수요일: 오후 12:00~3:00, 오후 6:00~10:00',
        '목요일: 오후 12:00~3:00, 오후 6:00~10:00',
        '금요일: 오후 12:00~3:00, 오후 6:00~10:00',
        '토요일: 오후 12:00~3:00, 오후 6:00~10:00',
        '일요일: 오후 12:00~3:00, 오후 6:00~9:30',
      ],
      rating: '4.8',
      __v: 0,
    },
    {
      _id: '6418354e3a9bde328969b3f8',
      section: '서울시 강남구',
      name: '프레퍼스 다이어트푸드 강남구청점',
      address: '대한민국 서울특별시 강남구 학동로 338',
      location: {
        lat: 37.5164665,
        lng: 127.0404191,
      },
      userRatingsTotal: '1',
      phoneNumber: '010-7665-8994',
      openingHours: [
        '월요일: 오전 10:30 ~ 오후 9:00',
        '화요일: 오전 10:30 ~ 오후 9:00',
        '수요일: 오전 10:30 ~ 오후 9:00',
        '목요일: 오전 10:30 ~ 오후 9:00',
        '금요일: 오전 10:30 ~ 오후 9:00',
        '토요일: 휴무일',
        '일요일: 휴무일',
      ],
      rating: '5',
      __v: 0,
    },
    {
      _id: '6418354e3a9bde328969b3fa',
      section: '서울시 강남구',
      name: '마마리마켓',
      address: '대한민국 서울특별시 강남구 선릉로130길 5',
      location: {
        lat: 37.5166925,
        lng: 127.0420601,
      },
      userRatingsTotal: '7',
      phoneNumber: '02-515-2163',
      openingHours: [
        '월요일: 오전 11:00 ~ 오후 9:00',
        '화요일: 오전 11:00 ~ 오후 9:00',
        '수요일: 오전 11:00 ~ 오후 9:00',
        '목요일: 오전 11:00 ~ 오후 9:00',
        '금요일: 오전 11:00 ~ 오후 9:00',
        '토요일: 오전 11:00 ~ 오후 9:00',
        '일요일: 휴무일',
      ],
      rating: '4.7',
      __v: 0,
    },
  ];

  find({ section }) {
    const Restaurant = this.Restaurants.filter(
      (el) => el.section === section.section,
    );
    return Restaurant.length ? Restaurant : null;
  }
}
describe('RestaurantService', () => {
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const RestaurantModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getModelToken('Restaurant'),
          useClass: MockRestaurantModel,
        },
      ],
    }).compile();

    restaurantService =
      RestaurantModule.get<RestaurantService>(RestaurantService);
  });

  describe('getRestaurant', () => {
    it('해당 행정구역의 추천식당 목록 반환!!', async () => {
      const section = '서울시 강남구';
      const mockRestaurantModel = new MockRestaurantModel();
      expect(await restaurantService.getRestaurant({ section })).toBe(
        mockRestaurantModel.find({ section }),
      );
    });
  });
});
