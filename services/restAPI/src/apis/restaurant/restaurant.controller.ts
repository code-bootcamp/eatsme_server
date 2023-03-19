import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/road/post/restaurant')
  postRestaurant(
    @Body() division: object, //서울시의 각행정구역을 입력받는다.
  ): Promise<void> {
    const [section] = Object.values(division);
    return this.restaurantService.postRestaurant({ section });
  }
}
