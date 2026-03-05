import { Component, inject } from '@angular/core';
import { TerminalOrderStore } from '../../../../core/stores/terminalOrderStore';
import { HlmButtonImports } from '../../../../shared/components/ui/ui-button-helm/src';
import { IconQrScan } from '../../../../shared/components/icons/icon-qr-scan';
import { IconCode } from '../../../../shared/components/icons/icon-code';
import { Steps } from '../../../../core/services/order/terminalSteps';

@Component({
  selector: 'app-order-authentification',
  templateUrl: './order-authentification.html',
  imports: [HlmButtonImports, IconQrScan, IconCode],
})
export class OrderAuthentification {
  public terminalOrderStore: TerminalOrderStore;
  protected readonly Steps = Steps;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.terminalOrderStore.setIsLogged(false);
    this.terminalOrderStore.setCustomer(null);
  }
}
