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
import { IPersonalMapsServiceCreatePersonalMap } from './interface/personalMapsService.interface';
@Injectable()
export class PersonalMapsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly restaurantService: RestaurantService,
  ) {}
  apiKey = process.env.GOOGLE_MAP_API_KEY;

  async createPersonalMap({
    body,
  }: IPersonalMapsServiceCreatePersonalMap): Promise<Restaurant[]> {
    const restaurantInfos = Promise.all(
      body.info.map(async (el) => {
        const restaurantInfo = await this.restaurantModel
          .find({
            restaurantName: el.restaurantName,
            location: el.location,
          })
          .exec();
        if (restaurantInfo.length) {
          return await restaurantInfo[0];
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
            geometry,
            place_id,
            name: restaurantName,
            rating,
            user_ratings_total: userRatingsTotal,
          } = newRestaurant[0];
          const address = newRestaurant[0].formatted_address || null;
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
    return restaurantInfos;
  }
}
