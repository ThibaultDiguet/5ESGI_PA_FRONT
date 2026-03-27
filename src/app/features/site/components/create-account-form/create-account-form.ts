import {Component, input} from '@angular/core';
import {HlmInput} from "../../../../shared/components/ui/ui-input-helm/src";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HlmFormFieldImports} from '../../../../shared/components/ui/ui-form-field-helm/src';

@Component({
  selector: 'app-create-account-form',
  imports: [
    HlmInput,
    ReactiveFormsModule,
    HlmFormFieldImports,
    FormsModule
  ],
  templateUrl: './create-account-form.html',
})
export class CreateAccountForm {
  form = input.required<FormGroup>();

  get email(): FormControl {
    return this.form().get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form().get('name') as FormControl;
  }

  get isEmailTouched(): boolean {
    return !!this.email && this.email.touched;
  }

  get isNameTouched(): boolean {
    return !!this.name && this.name.touched;
  }
}
