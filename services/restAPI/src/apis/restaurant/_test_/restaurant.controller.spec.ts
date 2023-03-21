// import { Test } from '@nestjs/testing';
// import { RestaurantController } from '../restaurant.controller';
// import { RestaurantService } from '../restaurant.service';
// import { RestaurantDocument } from '../schemas/restaurant.schemas';

// describe('RestaurantController', () => {
//   let restaurantController: RestaurantController;
//   let restaurantService: RestaurantService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [
//         RestaurantController, //
//       ],
//       providers: [
//         RestaurantService, //
//       ],
//     }).compile();

//     restaurantService = moduleRef.get<RestaurantService>(RestaurantService);
//     restaurantController =
//       moduleRef.get<RestaurantController>(RestaurantController);
//   });

//   describe('getRestaurant', () => {
//     it('추천 식당 목록 반환 ', async () => {
//       jest
//         .spyOn(restaurantService, 'getRestaurant')
//         .mockImplementation(() => result);

//       expect(await restaurantController.getRestaurant({ section })).toBe(
//         result,
//       );
//     });
//   });
// });
