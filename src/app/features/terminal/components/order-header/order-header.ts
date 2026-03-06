import { Component, inject } from '@angular/core';
import { TerminalSteps } from '../../../../core/services/order/terminalSteps';
import { HlmButtonImports } from '../../../../shared/components/ui/ui-button-helm/src';
import { RestaurantConfigStore } from '../../../../core/stores/restaurantConfigStore';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.html',
  imports: [HlmButtonImports],
})
export class OrderHeader {
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;

  constructor() {
    this.stepService = inject(TerminalSteps);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
  }
}
