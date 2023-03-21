import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/road/restaurant')
  postRestaurant(@Body() division: object): Promise<void> {
    const [section] = Object.values(division);
    return this.restaurantService.postRestaurant({ section });
  }

  @Delete('/road/restaurant')
  deleteRestaurant(): Promise<string> {
    //개발과정중 DB의 데이터를 확인하고 지우기 위해 만들었습니다.
    return this.restaurantService.deleteAllCollection();
  }

  @Get('/road/restaurant')
  getRestaurant(@Body() division: object): Promise<Restaurant[]> {
    const [section] = Object.values(division);
    return this.restaurantService.getRestaurant({ section });
  }
}
