import { Restaurant } from 'src/apis/restaurant/schemas/restaurant.schemas';

export class CreateReamintalbeInput {
  reservation_time: number;
  restaurant: Restaurant;
}
