import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Restaurant } from '../restaurant/schemas/restaurant.schemas';
import { RestaurantService } from '../restaurant/restaurant.service';

import {
  IPersonalMapsServiceCreatePersonalMap,
  IPersonalMapsServiceGetPersonalMap,
  IPersonalMapsServiceGetPersonalMapReturn,
} from './interface/personalMapsService.interface';

import axios from 'axios';

@Injectable()
export class PersonalMapsService {
  constructor(
    private readonly restaurantService: RestaurantService, //
  ) {}

  apiKey = process.env.GOOGLE_MAP_API_KEY;
  async createPersonalMap({
    req,
  }: IPersonalMapsServiceCreatePersonalMap): Promise<Restaurant[]> {
    console.log('---식당 정보 등록---');
    const restaurantInfos = await Promise.all(
      req.body.info.map(async (el) => {
        const restaurantInfo =
          await this.restaurantService.findByNameWithLocation({
            restaurantName: el.restaurantName,
            location: el.location,
          });

        if (restaurantInfo.length) {
          return await restaurantInfo[0];
        } else {
          const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${el.restaurantName}&key=${this.apiKey}&location=${el.location.lat}%2C${el.location.lng}&radius=100&language=ko`,
          };
          const result = await axios(config);
          const newRestaurant = result.data.results.filter((it) => {
            return it.name === el.restaurantName;
          });
          if (newRestaurant.length) {
            const address = newRestaurant[0].formatted_address || null;
            const { phoneNumber, openingDays } =
              await this.restaurantService.getDetails({
                place_id: newRestaurant[0].place_id,
              });

            const saveRestaurantInPut = {
              address,
              phoneNumber,
              openingDays,
              area: el.area,
              section: el.section,
              restaurantName: newRestaurant[0].name,
              location: newRestaurant[0].geometry.location,
              userRatingsTotal: newRestaurant[0].user_ratings_total,
              rating: newRestaurant[0].rating,
            };

            const postRestaurant =
              await this.restaurantService.saveRestaurantInfo({
                saveRestaurantInPut,
              });

            return postRestaurant;
          } else {
            const saveRestaurantInPut = {
              ...el,
              address: null,
              openingDays: null,
              phoneNumber: null,
            };
            const postRestaurant =
              await this.restaurantService.saveRestaurantInfo({
                saveRestaurantInPut,
              });
            return postRestaurant;
          }
        }
      }),
    );
    console.log('---식당 정보 등록 완료---');
    return restaurantInfos;
  }

  async getPersonalMap({
    req,
  }: IPersonalMapsServiceGetPersonalMap): Promise<
    IPersonalMapsServiceGetPersonalMapReturn[]
  > {
    const restaurantInfo = await this.restaurantService.findByIds({ req });
    const personalMapInfo = restaurantInfo.map((el) => {
      const { _id: restaurantId, restaurantName, location } = el;

      const address = el.address || null;

      const rating = el.rating || null;

      return { restaurantId, restaurantName, rating, address, location };
    });

    return personalMapInfo;
  }
}
