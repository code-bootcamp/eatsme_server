import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import {
  IRestaurantServiceDeleteCollection,
  IRestaurantServiceFindByIds,
  IRestaurantServiceFindByNameWithLocation,
  IRestaurantServiceFindOneRestaurant,
  IRestaurantServiceGetDetails,
  IRestaurantServiceGetDetailsReturn,
  IRestaurantServiceGetRestaurant,
  IRestaurantServiceGetRestaurants,
  IRestaurantServicePostAndGetRestaurant,
  IRestaurantServiceSaveRestaurantInfo,
  IRestaurantServiceUserGetRestaurants,
} from './interfaces/restaurantService.interface';
import {
  Restaurant,
  RestaurantDocument, //
} from './schemas/restaurant.schemas';

import { Model } from 'mongoose';
import { TimeTablesService } from '../timeTable/timeTable.service';
import { RemainTablesService } from '../remaintable/remainTable.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,

    private readonly remainTablesService: RemainTablesService, //

    private readonly timeTablesService: TimeTablesService,
  ) {}

  apiKey = process.env.GOOGLE_MAP_API_KEY;

  async saveRestaurantInfo({
    saveRestaurantInPut,
  }: IRestaurantServiceSaveRestaurantInfo): Promise<Restaurant> {
    return await new this.restaurantModel({
      ...saveRestaurantInPut,
    }).save();
  }

  async findByIds({ req }: IRestaurantServiceFindByIds): Promise<Restaurant[]> {
    const ids = JSON.parse(JSON.stringify(req.query.data)).split(',');
    return this.restaurantModel.find({
      _id: { $in: ids },
    });
  }

  async findByNameWithLocation({
    restaurantName,
    location,
  }: IRestaurantServiceFindByNameWithLocation): Promise<Restaurant[]> {
    const restaurantInfo = await this.restaurantModel
      .find({
        restaurantName,
        location,
      })
      .exec();
    return restaurantInfo;
  }

  async postRestaurants({
    req,
  }: IRestaurantServicePostAndGetRestaurant): Promise<void> {
    const { area, section } = req.query;
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${area} ${section}&key=${this.apiKey}&language=ko&type=restaurant`,
    };
    const result = await axios(config);
    const restaurantsInfos = result.data.results;
    await this.saveRepeat({ restaurantsInfos, section, area });
    const nextPageToken = result.data.next_page_token;
    await this.saveNextPage({ nextPageToken, section, area });
  }

  saveRepeat({
    restaurantsInfos,
    section, //
    area,
  }): void {
    restaurantsInfos.forEach(async (el) => {
      // console.log(el?.photos[0]?.photo_reference, '####');
      // const config = {
      //   method: 'get',
      //   url: `https://maps.googleapis.com/maps/api/place/photo/?maxwidth=300&photo_reference=${el?.photos[0]?.photo_reference}&key=${this.apiKey}`,
      // };
      // const result = await axios(config);
      const {
        geometry,
        place_id,
        name: restaurantName,
        rating,
        user_ratings_total: userRatingsTotal,
      } = el;
      const address = el.formatted_address || null;
      const { location } = geometry;
      const details = await this.getDetails(place_id);
      const { phoneNumber, openingDays } = details;
      if (rating >= 4.5) {
        //이미 있는지 확인하고 없는 경우에만 DB에 저장한다.
        const findRestaurant = await this.restaurantModel
          .findOne({
            restaurantName,
          })
          .exec();
        if (!findRestaurant) {
          const postRestaurant = await new this.restaurantModel({
            restaurantName,
            address,
            location,
            userRatingsTotal,
            rating,
            phoneNumber,
            openingDays,
            section,
            area,
          }).save();
          console.log(postRestaurant);
        }
      }
    });
  }

  async getDetails({
    place_id,
  }: IRestaurantServiceGetDetails): Promise<IRestaurantServiceGetDetailsReturn> {
    const placeConfig = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?&key=${this.apiKey}&language=ko&place_id=${place_id}&fields=formatted_phone_number,opening_hours`,
    };
    const result = await axios(placeConfig);
    const phoneNumber = result.data.result?.formatted_phone_number || null;
    const openingDays = result.data.result?.opening_hours?.weekday_text || null;
    return { phoneNumber, openingDays };
  }

  async saveNextPage({ nextPageToken, section, area }): Promise<void> {
    const getNextRestaurant = ({ nextPageToken }) => {
      if (nextPageToken) {
        const nextConfig = {
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=restaurant&key=${this.apiKey}&language=ko&pagetoken=${nextPageToken}&opennow&fields=current_opening_hours`,
        };
        //2초정도의 지연시간이 없으면 같은 정보를 받아오기 때문에 setTimeout으로 지연시켜주었다.
        setTimeout(async () => {
          const result = await axios(nextConfig);
          const restaurantsInfos = result.data.results;
          await this.saveRepeat({ restaurantsInfos, section, area });
          const nextPageToken = result.data.next_page_token;
          if (nextPageToken) {
            return getNextRestaurant({ nextPageToken });
          }
        }, 2000);
      }
    };
    getNextRestaurant({ nextPageToken });
  }

  async getRestaurants({
    req,
  }: IRestaurantServiceGetRestaurants): Promise<Restaurant[]> {
    const result = await this.restaurantModel
      .find({
        area: req.query.area,
        section: req.query.section,
      })
      .exec();
    if (!result[0]) {
      throw new HttpException(
        '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async UsergetRestaurants({
    req,
  }: IRestaurantServiceUserGetRestaurants): Promise<Restaurant[]> {
    const restaurantIdArr = req.body;
    const result = await this.restaurantModel
      .find({ _id: { $in: restaurantIdArr } })
      .exec();
    if (!result) {
      throw new HttpException(
        '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async findOneRestaurant({
    restaurant_id, //
  }: IRestaurantServiceFindOneRestaurant): Promise<Restaurant> {
    const isRestaurant = await this.restaurantModel
      .findOne({
        _id: restaurant_id,
      })
      .exec();

    if (!isRestaurant) {
      throw new HttpException(
        '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
        HttpStatus.BAD_REQUEST,
      );
    }
    return isRestaurant;
  }

  async getRestaurant({
    req,
  }: IRestaurantServiceGetRestaurant): Promise<object> {
    const { restaurantId, reservation_time, table } = req.body;

    const restaurantInfo = await this.findOneRestaurant({
      restaurant_id: restaurantId,
    });
    const isRemainTable = await this.remainTablesService.findOne({
      createReamintalbeInput: {
        reservation_time,
        restaurant: restaurantInfo,
      },
    });

    await this.remainTablesService.remainTable({
      _id: isRemainTable._id,
      table,
    });
    const reservationTime = await this.timeTablesService.findOne({
      _id: reservation_time,
    });

    const result = { restaurantInfo, ...reservationTime };
    return result;
  }

  deleteCollection({
    req,
  }: IRestaurantServiceDeleteCollection): Promise<string> {
    return this.restaurantModel
      .deleteOne({
        _id: req.query._id,
      })
      .then((res) => {
        return res.deletedCount
          ? '정상적으로 지워졌습니다.'
          : '이미 지워진 collection입니다.';
      })
      .catch((err) => {
        throw new HttpException(
          '잘못된 ID 형식입니다. 발급 받은 ID를 입력해주세요',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  deleteSection({ req }: IRestaurantServiceDeleteCollection): Promise<string> {
    return this.restaurantModel
      .deleteMany({
        area: req.query.area,
        section: req.query.section,
      })
      .then((res) => {
        console.log(res);
        return res.deletedCount
          ? `${res.deletedCount}개의 식당 정보를 정상적으로 지웠습니다.`
          : '이미 지워진 행정구역입니다.';
      });
  }
}
