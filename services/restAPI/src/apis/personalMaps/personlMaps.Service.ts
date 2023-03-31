import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    body,
  }: IPersonalMapsServiceCreatePersonalMap): Promise<Restaurant[]> {
    console.log('---식당 정보 등록---');
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
          const add = '제주 제주시 애월읍 하귀로 66';
          const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${el.restaurantName}&key=${this.apiKey}&location=${el.location.lat}%2C${el.location.lng}&radius=100&language=ko`,
          };
          const result = await axios(config);
          const newRestaurant = result.data.results.filter((it) => {
            console.log('#######');
            console.log(el.restaurantName, it.name);
            return it.name === el.restaurantName;
          });
          if (newRestaurant) {
            console.log('입력값을 그대로 저장');
            console.log(el);

            const postRestaurant = await new this.restaurantModel({
              ...el,
              openingDays: null,
              phoneNumber: null,
            }).save();
            console.log(postRestaurant);
          } else {
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
            console.log('########');
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
            console.log(postRestaurant);
            return postRestaurant;
          }
        }
      }),
    );
    console.log('---식당 정보 등록 완료---');
    return restaurantInfos;
  }

  async getPersonalMap({
    body,
  }: IPersonalMapsServiceGetPersonalMap): Promise<
    IPersonalMapsServiceGetPersonalMapReturn[]
  > {
    console.log('---식당 정보 조회---');
    const restaurantInfo = await Promise.all(
      body.map(async (_id) => {
        //없는 경우 null을 반환한다. 이때 에러를 던져 준다.
        const result = await this.restaurantModel.findById({ _id });
        if (!result) {
          throw new HttpException(
            '등록되지 않은 식당입니다. 등록후 조회해주세요',
            HttpStatus.BAD_REQUEST,
          );
        }

        const { restaurantName, address, rating, _id: id, location } = result;
        return { restaurantName, address, rating, _id, location };
      }),
    );
    console.log('---식당 정보 조회 완료');
    return restaurantInfo;
  }
}
