import {Component, Input} from '@angular/core';
import {HlmInput} from "../../../shared/components/ui/ui-input-helm/src";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HlmFormFieldImports} from '../../../shared/components/ui/ui-form-field-helm/src';
import {BrnInputOtpImports} from '@spartan-ng/brain/input-otp';
import {HlmInputOtpImports} from '../../../shared/components/ui/ui-input-otp-helm/src';

@Component({
  selector: 'app-login-form',
  imports: [
    HlmInput,
    ReactiveFormsModule,
    HlmFormFieldImports,
    BrnInputOtpImports,
    HlmInputOtpImports,
    FormsModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  @Input() form!: FormGroup;
  @Input() step: 'email' | 'otp' = 'email';

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get otp(): FormControl {
    return this.form.get('otp') as FormControl;
  }

  get isEmailTouched(): boolean {
    return !!this.email && this.email.touched;
  }

  get isOtpTouched(): boolean {
    return !!this.otp && this.otp.touched;
  }
}
