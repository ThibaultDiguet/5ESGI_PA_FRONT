import { Component, inject } from '@angular/core';
import { HlmButton } from '../../../../shared/components/ui/ui-button-helm/src';
import { TerminalOrderStore } from '../../../../core/stores/terminalOrderStore';
import { FormsModule } from '@angular/forms';
import { NumericKeyboardCode } from '../code-keyboard/numeric-keyboard-code';
import { OrderAuthentificationLogin } from '../order-authentification-login/order-authentification-login';

@Component({
  selector: 'app-order-authentification-code',
  templateUrl: './order-authentification-code.html',
  imports: [HlmButton, FormsModule, NumericKeyboardCode, OrderAuthentificationLogin],
})
export class OrderAuthentificationCode {
  public terminalOrderStore: TerminalOrderStore;
  public loyaltyCode: string;
  public readonly loyaltyCodeDigits = 8;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.loyaltyCode = '';
  }

  onCodeChange(event: string) {
    this.loyaltyCode = event;
  }
}
