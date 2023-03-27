import { Type } from '@nestjs/common';
import { RestaurantDocument } from 'src/apis/restaurant/schemas/restaurant.schemas';

export interface IPersonalMapsServiceCreatePersonalMap {
  body: {
    area: string;
    course: string;
    startPoint: string;
    endPoint: string;
    info: {
      restaurantName: string;
      recommend: string;
      location: {
        lat: number;
        lng: number;
      };
    }[];
  } | null;
}
export interface IPersonalMapsServiceGetPersonalMap {
  body: string[];
}
export interface IPersonalMapsServiceGetPersonalMapReturn {
  restaurantName: string;
  address: string;
  rating: string;
  location: {
    lat: number;
    lng: number;
  };
}
