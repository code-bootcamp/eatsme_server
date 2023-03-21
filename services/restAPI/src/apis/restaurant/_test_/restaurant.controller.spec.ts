import { Test } from '@nestjs/testing';
import { IRestaurantServiceGetRestaurant } from '../interfaces/restaurantService.interface';
import { RestaurantController } from '../restaurant.controller';
import { RestaurantService } from '../restaurant.service';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schemas';

//mockService를 만들어서 해결하면 되겠다.
class MockRestaurantService {
  //Mock서비스를 모두 만들고 값을 넣어 검증해본다.
  constructor(
    private readonly restaurantService: RestaurantService, //
  ) {}

  // getRestaurants();
  // deleteCollection();
}
describe('RestaurantController', () => {
  let restaurantController: RestaurantController;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [
        RestaurantController, //
      ],
      providers: [
        {
          provide: RestaurantService,
          useClass: MockRestaurantService,
        },
      ],
    }).compile();

    restaurantService = moduleRef.get<RestaurantService>(RestaurantService);
    restaurantController =
      moduleRef.get<RestaurantController>(RestaurantController);
  });

  describe('getRestaurants', () => {
    it('검증 결과 : 해당 행정구역의 식당 정보를 반환해야한다. ', async () => {
      const result = [
        [
          {
            _id: '6418f42923cd74ad5797ee08',
            section: '서울시 종로구',
            name: '엘샌드위치',
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
            _id: '6418f56286f9143cc10f9891',
            section: '서울시 종로구',
            name: '그린앤그레인(Greens&Grains)',
            address: '대한민국 서울특별시 종로구 삼봉로 81',
            location: {
              lat: 37.5723555,
              lng: 126.9818018,
            },
            userRatingsTotal: '47',
            phoneNumber: '02-6367-7252',
            openingHours: [
              '월요일: 오전 9:00 ~ 오후 9:00',
              '화요일: 오전 9:00 ~ 오후 9:00',
              '수요일: 오전 9:00 ~ 오후 9:00',
              '목요일: 오전 9:00 ~ 오후 9:00',
              '금요일: 오전 9:00 ~ 오후 9:00',
              '토요일: 휴무일',
              '일요일: 휴무일',
            ],
            rating: '4.4',
            __v: 0,
          },
        ],
      ];
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockImplementation(
          ({
            body,
          }: IRestaurantServiceGetRestaurant): Promise<Restaurant[]> => {
            return result;
          },
        );

      expect(await restaurantController.getRestaurants(body)).toBe(result);
    });

    it('검증 결과 : 등록후 조회하라는 에러 메세지를 던진다. ', async () => {
      const result = ['식당들의 정보'];
      const body = '서울시 잇츠미구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockImplementation(() => result);
    });
  });
});
