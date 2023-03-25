import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RestaurantController } from '../restaurant.controller';
import { RestaurantService } from '../restaurant.service';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schemas';
import { MockRestaurantDb } from './restaurant.mockDB';

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

  //!------getRestaurants-----!//
  describe('getRestaurants', () => {
    it('등록된 행정구역인 경우 추천 식당목록의 정보를 반환한다.', async () => {
      const mockRestaurantDb = new MockRestaurantDb();
      const body = '서울시 종로구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockImplementation(async ({ body }): Promise<Restaurant[]> => {
          return mockRestaurantDb.restaurantInfo;
        });
      expect(await restaurantController.getRestaurants(body)).toBe(
        mockRestaurantDb.restaurantInfo,
      );
    });

    it('등록되지 않은 행정구역인 경우 에러를 던진다.', async () => {
      const body = '서울시 잇츠미구';
      jest
        .spyOn(restaurantService, 'getRestaurants')
        .mockRejectedValue(
          new HttpException(
            '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
            HttpStatus.BAD_REQUEST,
          ),
        );
      const result = async () => {
        await restaurantService.getRestaurants({ body });
      };
      await expect(result).rejects.toThrowError(
        new HttpException(
          '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
  //!------deleteRestaurant-----!//
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

    it('잘못된 ID로 수정을 요청한 경우 삭제후 확인 메세지를 반환한다.', async () => {
      const body =
        '64194481b8388f33864812b잘못된경우 길거나 짧은 경우 없는 아이디 입력한 경우';
      jest
        .spyOn(restaurantService, 'deleteCollection')
        .mockRejectedValue(
          new HttpException(
            '잘못된 ID 형식입니다. 발급 받은 ID를 입력해주세요',
            HttpStatus.BAD_REQUEST,
          ),
        );
      const result = async () => {
        await restaurantService.deleteCollection({ body });
      };
      await expect(result).rejects.toThrowError(
        new HttpException(
          '잘못된 ID 형식입니다. 발급 받은 ID를 입력해주세요',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
  //!------deleteRestaurants-----!//
  describe('deleteRestaurants', () => {
    it('존재하는 행정구역으로 요청한 경우 정상적으로 삭제한 경우 확인 메세지를 반환한다.', async () => {
      const body = '서울시 강남구';
      const result = '14개의 식당 정보를 정상적으로 지웠습니다.';
      jest
        .spyOn(restaurantService, 'deleteSection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantController.deleteRestaurants(body)).toBe(result);
    });

    it('이미 지워진 행정구역으로 요청한 경우 확인 메세지를 반환한다. ', async () => {
      const body = '서울시 중구';
      const result = '이미 지워진 행정구역입니다.';
      jest
        .spyOn(restaurantService, 'deleteSection')
        .mockImplementation(async ({ body }) => {
          return result;
        });
      expect(await restaurantController.deleteRestaurants(body)).toBe(result);
    });
  });
  //!------postRestaurants-----!//
  describe('postRestaurants', () => {
    it('행정구역의 식당정보 저장하는 경우', async () => {
      const body = '서울시 중구';
      const result = '정상적으로 등록되었습니다.';
      jest
        .spyOn(restaurantService, 'postRestaurants')
        .mockImplementation(async ({ body }) => {
          null;
        });
      expect(await restaurantController.postRestaurants(body)).toBe(undefined);
    });
  });
});
