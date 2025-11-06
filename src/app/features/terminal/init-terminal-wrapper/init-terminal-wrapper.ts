import {Component, inject} from '@angular/core';
import {TerminalConfig} from '../../../core/types/terminal';
import {TerminalService} from '../../../core/services/terminal';
import {InitTerminalForm} from '../init-terminal-form/init-terminal-form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HlmButton} from '../../../shared/components/ui/ui-button-helm/src';
import {StyleService} from '../../../core/services/style';
import {LocalStorageService} from '../../../core/services/localStorage';

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
  configLoadedFromCache = false;

  terminalService : TerminalService = inject(TerminalService);
  styleService : StyleService = inject(StyleService);
  localStorageService : LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const cachedConfig = this.localStorageService.getItem('terminal-config');

    if (cachedConfig && typeof cachedConfig === "object") {
      try {
        this.config = cachedConfig as TerminalConfig;
        this.configLoadedFromCache = true;
        this.styleService.applyStyles(this.config!.styles);

      } catch {
        this.localStorageService.removeItem('terminal-config');
        this.localStorageService.removeItem('terminal-uuid');
      }
    }

  }

  onUuidSubmitted(uuid: string) {
    this.terminalService.registerTerminal(uuid).subscribe({
      next: (data ) => {
        const config : TerminalConfig = data as TerminalConfig
        this.config = config;
        this.uuidNotFound = false;

        this.styleService.applyStyles(config.styles);
      },
      error: () => {
        this.uuidNotFound = true;
      }
    });
  }

  deleteConfig(): void {
    this.styleService.resetAll();
    this.config = null;
    this.configLoadedFromCache = false;
    this.localStorageService.removeItem('terminal-config');
    this.localStorageService.removeItem('terminal-uuid');
  }

  onConfigValidated(): void {
    if (!this.config) return;
    this.localStorageService.setItem('terminal-uuid', this.config.terminal.uuid);
    this.localStorageService.setItem('terminal-config', this.config);
    this.configLoadedFromCache = true;
  }

  onSync(): void {
    if (!this.config) return;
    this.terminalService.registerTerminal(this.config.terminal.uuid).subscribe({
      next: (freshConfig) => {
        this.config = freshConfig as TerminalConfig;
        this.styleService.applyStyles(this.config.styles);
        this.localStorageService.setItem('terminal-config', JSON.stringify(this.config));
      }
    });
  }
}
