import {Component, inject} from '@angular/core';
import {RestaurantConfigStore} from '../../../core/stores/restaurantConfigStore';
import {TerminalSteps} from '../../../core/services/order/terminalSteps';
import {IconHand} from '../../../shared/components/icons/icon-hand';

@Component({
  selector: 'app-order-welcome',
  templateUrl: './order-welcome.html',
  imports: [IconHand],
})
export class OrderWelcome {
  public restaurantConfig: RestaurantConfigStore;
  public terminalSteps: TerminalSteps;
  constructor() {
    this.restaurantConfig = inject(RestaurantConfigStore);
    this.terminalSteps = inject(TerminalSteps);
  }
}
