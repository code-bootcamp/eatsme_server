import { Request } from 'express';

export interface IPersonalMapsServiceCreatePersonalMap {
  req: Request;
}
export interface IPersonalMapsServiceGetPersonalMap {
  req: Request;
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
