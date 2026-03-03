import { Component, inject } from '@angular/core';
import { RestaurantConfigStore } from '../../../core/stores/restaurantConfigStore';
import { IconHand } from '../../../shared/components/icons/icon-hand';
import { TerminalOrderStore } from '../../../core/stores/terminalOrderStore';

@Component({
  selector: 'app-order-welcome',
  templateUrl: './order-welcome.html',
  imports: [IconHand],
})
export class OrderWelcome {
  public restaurantConfig: RestaurantConfigStore;
  public terminalOrderStore: TerminalOrderStore;

  constructor() {
    this.restaurantConfig = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
