import { Body, Controller, Delete, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/road/restaurant')
  postRestaurant(
    @Body() division: object, //서울시의 각행정구역을 입력받는다.
  ): Promise<void> {
    const [section] = Object.values(division);
    return this.restaurantService.postRestaurant({ section });
  }

  @Delete('/road/restaurant')
  DeleteRestaurant(): Promise<string> {
    //개발과정중 DB의 데이터를 확인하고 지우기 위해 만들었습니다.
    return this.restaurantService.deleteAllCollection();
  }
}
