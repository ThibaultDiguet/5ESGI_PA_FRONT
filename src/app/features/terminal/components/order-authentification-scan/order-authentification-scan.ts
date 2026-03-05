import { Component, inject } from '@angular/core';
import { QrCodeScannerLottie } from '../../../../shared/components/lotties/qr-code-scanner-lottie';
import { HlmButton } from '../../../../shared/components/ui/ui-button-helm/src';
import { TerminalOrderStore } from '../../../../core/stores/terminalOrderStore';
import { Steps } from '../../../../core/services/order/terminalSteps';

@Component({
  selector: 'app-order-authentification-scan',
  templateUrl: './order-authentification-scan.html',
  imports: [QrCodeScannerLottie, HlmButton],
})
export class OrderAuthentificationScan {
  public terminalOrderStore: TerminalOrderStore;
  protected readonly Steps = Steps;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
