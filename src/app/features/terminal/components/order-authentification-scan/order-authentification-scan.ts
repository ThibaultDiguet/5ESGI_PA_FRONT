import {Component, inject, OnInit} from '@angular/core';
import {QrCodeScannerLottie} from '../../../../shared/components/lotties/qr-code-scanner-lottie';
import {HlmButton} from '../../../../shared/components/ui/ui-button-helm/src';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {ScannerService} from '../../../../core/services/scanner';
import {OrderAuthentificationLogin} from '../order-authentification-login/order-authentification-login';

@Component({
  selector: 'app-order-authentification-scan',
  templateUrl: './order-authentification-scan.html',
  imports: [QrCodeScannerLottie, HlmButton, OrderAuthentificationLogin],
})
export class OrderAuthentificationScan implements OnInit {
  public terminalOrderStore: TerminalOrderStore;
  public scannerService: ScannerService;
  public loyaltyCode: string;
  public readonly loyaltyCodeDigits = 8;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.scannerService = inject(ScannerService);
    this.loyaltyCode = '';
  }

  ngOnInit() {
    this.scannerService.scanResult$.subscribe((code: string) => {
      //le code doit être un string de 8 chiffres pour être considéré comme valide
      if (new RegExp(`^[0-9]{${this.loyaltyCodeDigits}}$`).test(code)) {
        this.loyaltyCode = code;
      }
    });
  }
}
