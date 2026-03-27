import {Component, computed, inject} from '@angular/core';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {IconQrScan} from '../../../../shared/components/icons/icon-qr-scan';
import {IconCode} from '../../../../shared/components/icons/icon-code';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {QRCodeComponent} from 'angularx-qrcode';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';

@Component({
  selector: 'app-order-authentification',
  templateUrl: './order-authentification.html',
  imports: [HlmButtonImports, IconQrScan, IconCode, QRCodeComponent],
})
export class OrderAuthentification {
  public terminalOrderStore: TerminalOrderStore;
  public restaurantConfig: RestaurantConfigStore
  public stepService: TerminalSteps;
  readonly registrationUrl = computed(() => {
    const host = window.location.origin;
    const uriName = this.restaurantConfig.config()?.restaurant.uri_name;

    return `${host}/site/${uriName}`;
  });

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.stepService = inject(TerminalSteps);
    this.restaurantConfig = inject(RestaurantConfigStore);

    this.terminalOrderStore.setIsLogged(false);
    this.terminalOrderStore.setCustomer(null);
  }
}
