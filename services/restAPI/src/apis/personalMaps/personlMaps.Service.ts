import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import {
  Restaurant,
  RestaurantDocument,
} from '../restaurant/schemas/restaurant.schemas';
import { RestaurantService } from '../restaurant/restaurant.service';
import {
  IPersonalMapsServiceCreatePersonalMap,
  IPersonalMapsServiceGetPersonalMap,
  IPersonalMapsServiceGetPersonalMapReturn,
} from './interface/personalMapsService.interface';
@Injectable()
export class PersonalMapsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly restaurantService: RestaurantService,
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
          //반복적으로 요청을보낸다.
          const newRestaurant = result.data.results.filter((it) => {
            return it.name === el.restaurantName;
          });
          if (newRestaurant.length) {
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
              section: el.section,
              area: el.area,
            }).save();
            return postRestaurant;
          } else {
            const postRestaurant = await new this.restaurantModel({
              ...el,
              openingDays: null,
              phoneNumber: null,
            }).save();
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
