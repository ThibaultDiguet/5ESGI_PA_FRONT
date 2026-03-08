import {Component, inject} from '@angular/core';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {IconBasket} from '../../../../shared/components/icons/icon-basket';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.html',
  imports: [HlmButtonImports, IconBasket],
})
export class OrderHeader {
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;
  public terminalOrderStore = inject(TerminalOrderStore);

  constructor() {
    this.stepService = inject(TerminalSteps);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
