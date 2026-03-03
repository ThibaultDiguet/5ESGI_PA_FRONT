import { inject, Injectable, signal } from '@angular/core';
import { TerminalOrder } from '../types/terminal';
import { TerminalSteps } from '../services/order/terminalSteps';

@Injectable({
  providedIn: 'root',
})
export class TerminalOrderStore {
  config = signal<TerminalOrder | null>(null);
  stepService: TerminalSteps;

  constructor() {
    this.stepService = inject(TerminalSteps);
  }

  setOrderServiceMode(mode: 'takeaway' | 'dine-in') {
    this.config.update((state) => {
      return {
        ...(state ?? ({} as TerminalOrder)),
        serviceMode: mode,
      };
    });
  }
}
