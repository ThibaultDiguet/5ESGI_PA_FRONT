import { Component, inject } from '@angular/core';
import { TerminalConfig } from '../../../../core/types/terminal';
import { TerminalService } from '../../../../core/services/terminal';
import { InitTerminalForm } from '../init-terminal-form/init-terminal-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../../core/services/localStorage';
import { PreviewTerminalConfig } from '../preview-terminal-config/preview-terminal-config';
import { ConfigAlreadyExist } from '../config-already-exist/config-already-exist';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../core/services/config';

@Component({
  selector: 'app-terminal-wrapper',
  imports: [
    InitTerminalForm,
    FormsModule,
    ReactiveFormsModule,
    PreviewTerminalConfig,
    ConfigAlreadyExist,
  ],
  standalone: true,
  templateUrl: './init-terminal-wrapper.html',
})
export class InitTerminalWrapper {
  config: TerminalConfig | null = null;
  uuidNotFound = false;
  configLoadedFromCache = false;

  terminalService: TerminalService;
  configService: ConfigService;
  localStorageService: LocalStorageService;
  router: Router;

  constructor() {
    this.router = inject(Router);
    this.terminalService = inject(TerminalService);
    this.configService = inject(ConfigService);
    this.localStorageService = inject(LocalStorageService);
  }

  ngOnInit(): void {
    const cachedConfig = this.localStorageService.getItem('terminal-config');

    if (cachedConfig && typeof cachedConfig === 'object') {
      try {
        this.config = cachedConfig as TerminalConfig;
        this.configLoadedFromCache = true;
        this.configService.applyRestaurantConfig(this.config!);
      } catch {
        this.localStorageService.removeItem('terminal-config');
        this.localStorageService.removeItem('terminal-uuid');
      }
    }
  }

  onUuidSubmitted(uuid: string) {
    this.terminalService.registerTerminal(uuid).subscribe({
      next: (data) => {
        const config: TerminalConfig = data as TerminalConfig;
        this.config = config;
        this.uuidNotFound = false;
        this.configService.applyTerminalConfig(config);
      },
      error: () => {
        this.uuidNotFound = true;
      },
    });
  }

  deleteConfig(): void {
    this.configService.resetToDefaultConfig();
    this.config = null;
    this.configLoadedFromCache = false;
    this.localStorageService.removeItem('terminal-config');
    this.localStorageService.removeItem('terminal-uuid');
  }

  saveConfig(): void {
    if (!this.config) return;
    this.localStorageService.setItem('terminal-uuid', this.config.terminal.uuid);
    this.localStorageService.setItem('terminal-config', this.config);
    this.configLoadedFromCache = true;

    this.router.navigate(['/terminal']);
  }

  synchronizeConfig(): void {
    if (!this.config) return;
    this.terminalService.registerTerminal(this.config.terminal.uuid).subscribe({
      next: (freshConfig) => {
        this.config = freshConfig as TerminalConfig;
        this.configLoadedFromCache = false;
      },
    });
  }
}
