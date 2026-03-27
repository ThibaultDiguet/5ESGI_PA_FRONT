import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component, inject, OnInit, signal} from '@angular/core';
import {CreateAccountForm} from '../create-account-form/create-account-form';
import {HlmButton} from '../../../../shared/components/ui/ui-button-helm/src';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {ConfigService} from '../../../../core/services/config';
import {CustomerService, RegisterInput} from '../../../../core/services/order/customer';
import {HlmError} from '../../../../shared/components/ui/ui-form-field-helm/src';
import {LoadingState} from '../../../../shared/components/primitives/loading-state/loading-state';

@Component({
  selector: 'app-create-account-wrapper',
  imports: [
    ReactiveFormsModule,
    CreateAccountForm,
    FormsModule,
    HlmButton,
    HlmError,
    LoadingState
  ],
  templateUrl: './create-account-wrapper.html',
})


export class CreateAccountWrapper implements OnInit {
  public restaurantConfig: RestaurantConfigStore;
  public configService: ConfigService;
  form: FormGroup;
  isPending = false;
  public error = signal<boolean>(false);
  public success = signal<boolean>(false);
  private fb: FormBuilder;
  private customerService: CustomerService;

  constructor() {
    this.fb = inject(FormBuilder);
    this.customerService = inject(CustomerService);
    this.configService = inject(ConfigService);
    this.restaurantConfig = inject(RestaurantConfigStore);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    if (this.restaurantConfig?.config()?.styles) {
      this.configService.applyRestaurantConfig(this.restaurantConfig.config()!);
    }
  }

  onSubmit() {
    const formEmail = this.form.get('email');
    const formName = this.form.get('name');
    const restaurantUuid = this.restaurantConfig.config()?.restaurant.uuid;

    if (this.form.valid && restaurantUuid) {
      this.isPending = true;

      const payload: RegisterInput = {
        restaurantUuid: restaurantUuid,
        name: formName?.value,
        email: formEmail?.value
      };

      this.customerService.register(payload).subscribe({
        next: () => {
          this.success.set(true);
          this.isPending = false;
        },
        error: (err) => {
          console.error("Échec de l'inscription", err);
          this.error.set(true);
          this.isPending = false;
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
