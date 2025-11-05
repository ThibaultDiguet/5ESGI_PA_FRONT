import {Component} from '@angular/core';
import {TerminalConfig} from '../../../core/types/terminal';
import {TerminalService} from '../../../core/services/terminal';
import {InitTerminalForm} from '../init-terminal-form/init-terminal-form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HlmButton} from '../../../shared/components/ui/ui-button-helm/src';

@Component({
  selector: 'app-terminal-wrapper',
  imports: [
    InitTerminalForm,
    FormsModule,
    HlmButton,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './init-terminal-wrapper.html'
})
export class InitTerminalWrapper {
  config: TerminalConfig | null = null;
  uuidNotFound = false;

  constructor(private terminalService: TerminalService) {
  }

  onUuidSubmitted(uuid: string) {
    this.terminalService.registerTerminal(uuid).subscribe({
      next: (data) => {
        this.config = data as TerminalConfig;
        this.uuidNotFound = false;

        //Simulation du service qui s'occupe d'appliquer le style récupéré de la config
        document.documentElement.style.setProperty('--primary', 'oklch(0.553 0.158 136.559)')
      },
      error: () => {
        this.uuidNotFound = true;
      }
    });
  }

  deleteConfig() {
    this.config = null;

    //Simulation du service qui s'occupe d'appliquer le style récupéré de la config
    document.documentElement.style.setProperty('--primary', 'oklch(0.633 0.196 33.687)')
  }

  onConfigValidated() {
    console.log('Config validée');
    this.config = null;
    //Enregistrer la config en cache. Cette config sera utilisée pour la borne.
  }
}
