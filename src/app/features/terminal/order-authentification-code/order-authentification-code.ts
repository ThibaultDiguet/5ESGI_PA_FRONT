import { Component, inject } from '@angular/core';
import { HlmButton } from '../../../shared/components/ui/ui-button-helm/src';
import { TerminalOrderStore } from '../../../core/stores/terminalOrderStore';
import { Steps } from '../../../core/services/order/terminalSteps';
import { FormsModule } from '@angular/forms';
import { NumericKeyboardCode } from '../../../shared/components/primitives/code-keyboard/numeric-keyboard-code';

@Component({
  selector: 'app-order-authentification-code',
  templateUrl: './order-authentification-code.html',
  imports: [HlmButton, FormsModule, NumericKeyboardCode],
})
export class OrderAuthentificationCode {
  public terminalOrderStore: TerminalOrderStore;
  protected readonly Steps = Steps;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
  }

  onCodeChange(event: string) {}
}
