import {Component, inject, signal} from '@angular/core';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {OrderLine, TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {CurrencyPipe} from '@angular/common';
import {QuantitySelector} from '../quantity-selector/quantity-selector';
import {OrderEasel} from '../order-easel/order-easel';
import {ServiceMode} from '../../../../core/types/terminal';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.html',
  imports: [
    HlmButtonImports,
    CurrencyPipe,
    QuantitySelector,
    OrderEasel
  ]
})
export class OrderCheckout {
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;
  public terminalOrderStore = inject(TerminalOrderStore);

  public showEaselSelection = signal<boolean>(false);

  constructor() {
    this.stepService = inject(TerminalSteps);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
  }

  protected handleValidateOrder() {
    if (this.terminalOrderStore.serviceMode() === ServiceMode.DINE_IN) {
      this.showEaselSelection.set(true);
    } else {
      this.stepService.next();
    }
  }

  protected onQuantityChange(amount: number, line: OrderLine) {

    if (amount > line.amount) {
      this.terminalOrderStore.addToBasket(line.product, 1)
    } else {
      this.terminalOrderStore.decreaseQuantity(line.product)
    }
  }
}
