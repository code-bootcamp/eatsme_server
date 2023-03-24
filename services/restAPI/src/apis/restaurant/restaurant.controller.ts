import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  //등록한 식당의 갯수를 반환해보자.
  @Post('/info/road/restaurant')
  postRestaurants(
    @Body() body: string, //
  ): Promise<void> {
    return this.restaurantService.postRestaurants({ body });
  }

  //!!---------------없는경우 등록하라고 에러 던지기-----------!!//
  @Get('/info/road/restaurant')
  getRestaurants(
    @Body() body: string, //
  ): Promise<Restaurant[]> {
    return this.restaurantService.getRestaurants({ body });
  }

  //!!---------------잘못된 양식인 경우 에러 던지기-----------!!//
  @Delete('/info/road/restaurant')
  deleteRestaurant(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteCollection({ body });
  }

  @Delete('/info/road/restaurants')
  deleteRestaurants(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteSection({ body });
  }
}
