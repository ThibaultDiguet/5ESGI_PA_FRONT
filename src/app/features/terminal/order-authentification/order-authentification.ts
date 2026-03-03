import { Component, inject } from '@angular/core';
import { TerminalOrderStore } from '../../../core/stores/terminalOrderStore';

@Component({
  selector: 'app-order-authentification',
  templateUrl: './order-authentification.html',
})
export class OrderAuthentification {
  public terminalOrderStore: TerminalOrderStore;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
  }
}
