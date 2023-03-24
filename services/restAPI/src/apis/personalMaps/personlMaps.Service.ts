import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import {
  Restaurant,
  RestaurantDocument,
} from '../restaurant/schemas/restaurant.schemas';
import { RestaurantService } from '../restaurant/restaurant.service';
import { ResourceLimits } from 'worker_threads';
@Injectable()
export class PersonalMapsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly restaurantService: RestaurantService,
  ) {}
  apiKey = process.env.GOOGLE_MAP_API_KEY;
  async createPersonalMap({ body }): Promise<Restaurant[]> {
    console.log(body.startPoint);
    const restaurantInfos = Promise.all(
      body.info.map(async (el) => {
        //같은 장소이지만 좌표가 조금 다를수 도 있지 않을까? 다른 API에서 보내주는 정보이니 재고해보자.
        //식당이름으로 검색한다.
        const restaurantInfo = await this.restaurantModel
          .find({
            restaurantName: el.restaurantName,
            //   location: el.location,
          })
          .exec();
        if (restaurantInfo.length) {
          return await restaurantInfo;
        } else {
          const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${el.restaurantName}&key=${this.apiKey}&location=${el.location.lat}%2C${el.location.lng}&radius=10&language=ko&type=restaurant`,
          };
          const result = await axios(config);
          const newRestaurant = result.data.results.filter((it) => {
            return it.name === el.restaurantName;
          });
          const {
            formatted_address: address,
            geometry,
            place_id,
            name: restaurantName,
            rating,
            user_ratings_total: userRatingsTotal,
          } = newRestaurant[0];
          const { location } = geometry;
          const { phoneNumber, openingDays } =
            await this.restaurantService.getDetails(place_id);
          const postRestaurant = await new this.restaurantModel({
            restaurantName,
            address,
            location,
            userRatingsTotal,
            rating,
            phoneNumber,
            openingDays,
            section: body.startPoint,
          }).save();
          return postRestaurant;
        }
      }),
    );
    return await restaurantInfos;
  }
}
