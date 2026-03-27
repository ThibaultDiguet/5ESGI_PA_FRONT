import {Component, inject, OnInit} from '@angular/core';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {IconHand} from '../../../../shared/components/icons/icon-hand';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';

@Component({
  selector: 'app-order-welcome',
  templateUrl: './order-welcome.html',
  imports: [IconHand],
})
export class OrderWelcome implements OnInit {
  public restaurantConfig: RestaurantConfigStore;
  public terminalOrderStore: TerminalOrderStore;
  public stepService: TerminalSteps;

  constructor() {
    this.restaurantConfig = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.stepService = inject(TerminalSteps);
  }

  ngOnInit() {
    this.terminalOrderStore.resetOrder();
  }
}
