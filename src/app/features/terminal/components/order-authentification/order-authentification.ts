import {Component, inject} from '@angular/core';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {IconQrScan} from '../../../../shared/components/icons/icon-qr-scan';
import {IconCode} from '../../../../shared/components/icons/icon-code';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';

@Component({
  selector: 'app-order-authentification',
  templateUrl: './order-authentification.html',
  imports: [HlmButtonImports, IconQrScan, IconCode],
})
export class OrderAuthentification {
  public terminalOrderStore: TerminalOrderStore;
  public stepService: TerminalSteps;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.stepService = inject(TerminalSteps);

    this.terminalOrderStore.setIsLogged(false);
    this.terminalOrderStore.setCustomer(null);
  }
}
