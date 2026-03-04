import { Component, inject } from '@angular/core';
import { TerminalOrderStore } from '../../../core/stores/terminalOrderStore';
import { LoadingConfig } from '../../site/components/loading-config/loading-config';

@Component({
  selector: 'app-order-authentification-login',
  templateUrl: './order-authentification-login.html',
  imports: [LoadingConfig],
})
export class OrderAuthentificationLogin {
  public terminalOrderStore: TerminalOrderStore;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
