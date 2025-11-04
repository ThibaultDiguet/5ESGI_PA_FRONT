import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HlmButton} from '../../../shared/components/ui/ui-button-helm/src';
import {InputControlComponent} from '../../../shared/components/form/input-control/input-control';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {HlmIconImports} from '../../../shared/components/ui/ui-icon-helm/src';
import {lucideChevronRight} from '@ng-icons/lucide';

@Component({
  selector: 'app-register-wrapper',
  imports: [
    FormsModule,
    HlmButton,
    ReactiveFormsModule,
    InputControlComponent,
    NgIcon,
    HlmIconImports
  ],
  providers: [provideIcons({lucideChevronRight})],
  templateUrl: './register-wrapper.html'
})
export class RegisterWrapper {

  form: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      uuid: ['', [Validators.required, Validators.maxLength(64)]],
    });
  }

  protected onSubmit() {
    if (this.form.valid) {
      const terminalUUID = this.form.get('uuid');
      console.log(terminalUUID?.value)
    }
  }
}
