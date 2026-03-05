import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HlmButton } from '../../../../shared/components/ui/ui-button-helm/src';
import { TerminalConfig } from '../../../../core/types/terminal';

@Component({
  selector: 'app-preview-terminal-config',
  imports: [HlmButton],
  templateUrl: './preview-terminal-config.html',
})
export class PreviewTerminalConfig {
  @Input() config: TerminalConfig | null = null;
  @Output() saveConfig = new EventEmitter();
  @Output() cancelInit = new EventEmitter();

  deleteConfig() {
    this.cancelInit.emit();
  }

  validateConfig() {
    this.saveConfig.emit();
  }
}
