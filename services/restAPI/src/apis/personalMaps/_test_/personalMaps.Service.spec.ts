import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RestaurantModule } from 'src/apis/restaurant/restaurant.module';
import { RestaurantService } from 'src/apis/restaurant/restaurant.service';
import {
  Restaurant,
  RestaurantDocument,
} from 'src/apis/restaurant/schemas/restaurant.schemas';
import { PersonalMapsModule } from '../personlMaps.module';
import { PersonalMapsService } from '../personlMaps.Service';
import { MockPersonalMapsDb } from './personalMaps.mockDB';

describe('PersonalMapsService', () => {
  let restaurantModel: Model<RestaurantDocument>;
  let restaurantService: RestaurantService;
  let personalMapsService: PersonalMapsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        RestaurantModule, //
        PersonalMapsModule,
      ],
      providers: [
        PersonalMapsService,
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
    personalMapsService =
      moduleRef.get<PersonalMapsService>(PersonalMapsService);
  });
  describe('createPersonalMap', () => {
    it('출발지와 도착지 그리고 경유지에대한 정보로 요청을 정상적으로 보낸경우', async () => {
      const { body, result } = new MockPersonalMapsDb();
      jest
        .spyOn(personalMapsService, 'createPersonalMap')
        .mockImplementation(async ({ body }): Promise<Restaurant[]> => {
          return result;
        });

      expect(await personalMapsService.createPersonalMap({ body })).toBe(
        result,
      );
    });
  });
});
