import { Request } from 'express';
import { Restaurant } from '../schemas/restaurant.schemas';

export interface IRestaurantServiceSaveRestaurantInfo {
  saveRestaurantInPut: Restaurant;
}

export interface IRestaurantServiceFindByIds {
  req: Request;
}

export interface IRestaurantServiceFindByNameWithLocation {
  restaurantName: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface IRestaurantServicePostAndGetRestaurant {
  req: Request;
}

export interface IRestaurantServiceGetRestaurant {
  req: Request;
}

export interface IRestaurantServiceFindOneRestaurant {
  restaurant_id: string;
}

export interface IRestaurantServiceGetRestaurants {
  req: Request;
}

export interface IRestaurantServiceUserGetRestaurants {
  req: Request;
}

export interface IRestaurantServiceUserGetRestaurants {
  req: Request;
}

export interface IRestaurantServiceGetDetails {
  place_id: string;
}

export interface IRestaurantServiceGetDetailsReturn {
  phoneNumber: string | null;
  openingDays: string[] | null;
}
export interface IRestaurantServiceDeleteCollection {
  req: Request;
}
