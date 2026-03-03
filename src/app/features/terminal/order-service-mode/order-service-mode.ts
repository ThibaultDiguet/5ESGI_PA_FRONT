import { Component, inject } from '@angular/core';
import { HlmButtonImports } from '../../../shared/components/ui/ui-button-helm/src';
import { RestaurantConfigStore } from '../../../core/stores/restaurantConfigStore';
import { IconDineIn } from '../../../shared/components/icons/icon-dine-in';
import { IconTakeaway } from '../../../shared/components/icons/icon-takeaway';
import { TerminalOrderStore } from '../../../core/stores/terminalOrderStore';

@Component({
  selector: 'app-order-service-mode',
  templateUrl: './order-service-mode.html',
  imports: [HlmButtonImports, IconDineIn, IconTakeaway],
})
export class OrderServiceMode {
  public terminalOrderStore: TerminalOrderStore;
  public restaurantConfig: RestaurantConfigStore;

  constructor() {
    this.restaurantConfig = inject(RestaurantConfigStore);
    this.terminalOrderStore = inject(TerminalOrderStore);
  }

  chooseService(mode: 'takeaway' | 'dine-in') {
    this.terminalOrderStore.setOrderServiceMode(mode);
    this.terminalOrderStore.stepService.next();
  }
}
