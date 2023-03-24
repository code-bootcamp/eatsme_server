import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from 'src/apis/restaurant/schemas/restaurant.schemas';
import { IPersonalMapsServiceCreatePersonalMap } from '../interface/personalMapsService.interface';
import { PersonalMapsController } from '../personlMaps.Controller';
import { PersonalMapsService } from '../personlMaps.Service';
import { MockPersonalMapsDb } from './personalMaps.mockDB';

describe('PersonalMapsController', () => {
  let restaurantModel: Model<RestaurantDocument>;
  let personalMapsController: PersonalMapsController;
  let personalMapsService: PersonalMapsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        PersonalMapsController, //
      ],
      providers: [
        PersonalMapsService,
        {
          provide: getModelToken('Restaurant'),
          useValue: Model<RestaurantDocument>,
        },
      ],
    }).compile();
    personalMapsController = moduleRef.get<PersonalMapsController>(
      PersonalMapsController,
    );
    personalMapsService =
      moduleRef.get<PersonalMapsService>(PersonalMapsService);
    restaurantModel = moduleRef.get<Model<RestaurantDocument>>(
      getModelToken('Restaurant'),
    );
    //
  });

  describe('postPersonalMap', () => {
    it('출발지와 도착지 그리고 경유지에대한 정보로 요청을 정상적으로 보낸경우', async () => {
      const { body, result } = new MockPersonalMapsDb();
      jest
        .spyOn(personalMapsService, 'createPersonalMap')
        .mockImplementation(
          async ({
            body,
          }: IPersonalMapsServiceCreatePersonalMap): Promise<Restaurant[]> => {
            return result;
          },
        );
      expect(await personalMapsController.postPersonalMap({ body })).toBe(
        result,
      );
    });
    //type에 문제가 있다.
  });
});
