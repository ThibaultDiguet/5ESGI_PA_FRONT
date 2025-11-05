import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmButton} from '../../../shared/components/ui/ui-button-helm/src';
import {InputControlComponent} from '../../../shared/components/form/input-control/input-control';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {HlmIconImports} from '../../../shared/components/ui/ui-icon-helm/src';
import {lucideChevronRight} from '@ng-icons/lucide';
import {HlmError} from '../../../shared/components/ui/ui-form-field-helm/src';

@Component({
  selector: 'app-init-terminal-form',
  imports: [
    FormsModule,
    HlmButton,
    ReactiveFormsModule,
    InputControlComponent,
    NgIcon,
    HlmIconImports,
    HlmError
  ],
  providers: [provideIcons({lucideChevronRight})],
  templateUrl: './init-terminal-form.html'
})
export class InitTerminalForm {
  @Input() uuidNotFound = false;
  @Output() uuidSubmitted = new EventEmitter<string>();

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      uuid: ['', [Validators.required, Validators.maxLength(64)]],
    });

  }

  onUuidInput() {
    this.uuidNotFound = false;
  }

  protected onSubmit() {
    if (this.form.valid) {
      const terminalUUID = this.form.get('uuid');
      this.uuidSubmitted.emit(terminalUUID!.value);
    }
  }
}
