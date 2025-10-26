import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth';
import { Component, inject } from '@angular/core';
import {LoginForm} from '../login-form/login-form';
import {HlmButton} from '../../../shared/components/ui/ui-button-helm/src';

export enum LoginStep {
  EMAIL = 'email',
  OTP = 'otp'
}

@Component({
  selector: 'app-login-wrapper',
  imports: [
    ReactiveFormsModule,
    LoginForm,
    FormsModule,
    HlmButton
  ],
  templateUrl: './login-wrapper.html',
  styleUrl: './login-wrapper.css'
})


export class LoginWrapper {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form: FormGroup;
  step: LoginStep = LoginStep.EMAIL;
  isPending = false;

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    const formEmail = this.form.get('email');
    const formOTP = this.form.get('otp');
    let shouldMarkAllAsTouched = true;

    if (this.step === LoginStep.OTP) {
      if (formOTP && formOTP.valid) {
        this.isPending = true;
        const email = formEmail!.value;
        const otp = formOTP.value;
        this.auth.verifyOtp(email, otp).subscribe({
          next: () => {
            this.isPending = false;
            shouldMarkAllAsTouched = false;
            console.log('LOGIN ET OTP OK');
          },
          error: () => {
            this.isPending = false;
            shouldMarkAllAsTouched = false;
            formOTP.setErrors({invalid: true});
            formOTP.markAsTouched();
          }
        });
      }
    } else if (this.step === LoginStep.EMAIL) {
      if (formEmail && formEmail.valid) {
        this.isPending = true;
        this.auth.sendOtp(formEmail.value).subscribe({
          next: () => {
            shouldMarkAllAsTouched = false;
            this.step = LoginStep.OTP;
            formEmail.disable();
            formOTP?.enable();
            formOTP?.reset();
            formOTP!.updateValueAndValidity();
            this.isPending = false;
          }
        });
      }
    }

    if (shouldMarkAllAsTouched) {
      this.form.markAllAsTouched();
    }
  }


  previousStep() {
    const formEmail = this.form.get('email');
    const formOTP = this.form.get('otp');

    this.isPending = false;
    this.step = LoginStep.EMAIL;
    formEmail?.reset();
    formEmail?.enable();
    formOTP?.disable();

  }
}
