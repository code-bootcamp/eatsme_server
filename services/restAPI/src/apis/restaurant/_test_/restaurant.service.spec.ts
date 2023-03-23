import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IRestaurantServiceGetDetailsReturn } from '../interfaces/restaurantService.interface';
import { RestaurantService } from '../restaurant.service';
import { RestaurantDocument } from '../schemas/restaurant.schemas';
import { MockRestaurantDb } from './restaurant.mockDB';

describe('RestaurantService', () => {
  let restaurantModel: Model<RestaurantDocument>;
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService, //
        {
          provide: getModelToken('Restaurant'),
          useValue: Model<RestaurantDocument>,
        },
      ],
    }).compile();
    restaurantService = moduleRef.get<RestaurantService>(RestaurantService);
    restaurantModel = moduleRef.get<Model<RestaurantDocument>>(
      getModelToken('Restaurant'),
    );
  });

  describe('postRestaurants', () => {
    it('행정구역의 식당정보를 요청한 경우 확인 메세지를 반환한다.', async () => {
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'postRestaurants')
        .mockImplementation(async ({ body }) => {
          return '정상적으로 등록되었습니다.';
        });
      expect(await restaurantService.postRestaurants({ body })).toBe(
        '정상적으로 등록되었습니다.',
      );
    });
  });

  describe('saveRepeat', () => {
    it('인자로 식당 정보와 행정구역 정보가 들어온 경우 저장해준다. 이때 반환값은 없다.', async () => {
      const section = '서울시 종로구';
      const restaurantsInfos = new MockRestaurantDb();
      jest
        .spyOn(restaurantService, 'saveRepeat')
        .mockImplementation(({ restaurantsInfos, section }): void => {
          null;
        });
      expect(
        await restaurantService.saveRepeat({ restaurantsInfos, section }),
      ).toBe(undefined);
    });
  });
  describe('getDetails', () => {
    it('입력받은 place_id로 세부정보를 받아오고 반환한다.', async () => {
      const place_id = '이 아이디로 식당정보의 세부정보를 요청할 수 있다.';
      const { details } = new MockRestaurantDb();
      jest
        .spyOn(restaurantService, 'getDetails')
        .mockImplementation(
          async ({ place_id }): Promise<IRestaurantServiceGetDetailsReturn> => {
            return details;
          },
        );
      expect(await restaurantService.getDetails({ place_id })).toBe(details);
    });
  });

  describe('saveNextPage', () => {
    it('다음 페이지 토큰과 행정구역 정보를 받아 다음페이지의 식당 정보를 저장한다. 이때 반환값은 없다.', async () => {
      const nextPageToken = '다음페이지의 정보를 요청할 수 있는 토큰';
      const section = '행정구역';

      jest
        .spyOn(restaurantService, 'saveNextPage')
        .mockImplementation(
          async ({ nextPageToken, section }): Promise<void> => {
            null;
          },
        );
      expect(
        await restaurantService.saveNextPage({ nextPageToken, section }),
      ).toBe(undefined);
    });
  });
});
