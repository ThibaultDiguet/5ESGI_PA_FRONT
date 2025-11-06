import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HlmButton} from "../../../shared/components/ui/ui-button-helm/src";
import {TerminalConfig} from '../../../core/types/terminal';

@Component({
  selector: 'app-config-already-exist',
  imports: [HlmButton],
  templateUrl: './config-already-exist.html',
})
export class ConfigAlreadyExist {
  @Input() config : TerminalConfig|null = null;
  @Output() deleteConfig = new EventEmitter();
  @Output() synchronizeConfig = new EventEmitter();

  removeConfig() {
    this.deleteConfig.emit();
  }

  syncConfig() {
    this.synchronizeConfig.emit();
  }
}
