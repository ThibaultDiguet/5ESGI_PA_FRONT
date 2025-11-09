import {Injectable, signal} from '@angular/core';
import {RestaurantConfig} from '../../../core/types/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantConfigContext {
  config = signal<RestaurantConfig | null>(null);

  setConfig(config: RestaurantConfig) {
    this.config.set(config);
  }

  clear() {
    this.config.set(null);
  }
}
