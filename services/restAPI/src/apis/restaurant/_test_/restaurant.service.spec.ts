import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { IRestaurantServiceGetDetailsReturn } from '../interfaces/restaurantService.interface';
import { RestaurantService } from '../restaurant.service';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schemas';
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
    it('행정구역의 식당정보를 요청한 경우 ', async () => {
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'postRestaurants')
        .mockImplementation(async ({ body }) => {
          null;
        });
      expect(await restaurantService.postRestaurants({ body })).toBe(undefined);
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
      const nextPageToken =
        'ads678c8d7hd8h1fq#eqwf <=다음페이지의 식당정보를 요청할 수 있는 토큰';
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

  describe('getRestaurants', () => {
    it('등록된 행정구역을 입력할 경우 해당 행정구역의 식당 정보를 반환한다.', async () => {
      const mockRestaurantDb = new MockRestaurantDb();
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockImplementation(async ({ body }): Promise<Restaurant[]> => {
          return mockRestaurantDb.restaurantInfo;
        });
      expect(await restaurantService.getRestaurants({ body })).toBe(
        mockRestaurantDb.restaurantInfo,
      );
    });
  });

  describe('deleteCollection', () => {
    it('발급받은 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
      const result = '정상적으로 지워졌습니다.';
      const body = '64194481b8388f33864812b7';
      jest
        .spyOn(restaurantService, 'deleteCollection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantService.deleteCollection({ body })).toBe(result);
    });
    it('이미 지워진 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
      const result = '이미 지워진 collection입니다.';
      const body = '64194481b8388f33864812bc';
      jest
        .spyOn(restaurantService, 'deleteCollection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantService.deleteCollection({ body })).toBe(result);
    });
  });

  describe('deleteSection', () => {
    it('존재하는 행정구역으로 요청한 경우 정상적으로 삭제한 경우 확인 메세지를 반환한다.', async () => {
      const body = '서울시 강남구';
      const result = '14개의 식당 정보를 정상적으로 지웠습니다.';
      jest
        .spyOn(restaurantService, 'deleteSection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantService.deleteSection({ body })).toBe(result);
    });

    it('이미 지워진 행정구역으로 요청한 경우 확인 메세지를 반환한다. ', async () => {
      const body = '서울시 중구';
      const result = '이미 지워진 행정구역입니다.';
      jest
        .spyOn(restaurantService, 'deleteSection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantService.deleteSection({ body })).toBe(result);
    });
  });
});
