import {Component, inject} from '@angular/core';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.html',
  imports: [
    HlmButtonImports,
    CurrencyPipe
  ]
})
export class OrderCheckout {
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;
  public terminalOrderStore = inject(TerminalOrderStore);

  constructor() {
    this.stepService = inject(TerminalSteps);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
