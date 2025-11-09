import {Style} from './style';

export interface Restaurant {
  name: string;
  uuid: string;
  uri_name: string;
  logo: string;
  favicon: string;
}

export interface RestaurantConfig {
  restaurant: Restaurant;
  styles: Style[];
}
