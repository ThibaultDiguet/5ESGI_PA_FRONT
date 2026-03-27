import {Component, EventEmitter, Input, Optional, Output, Self} from '@angular/core';
import {ControlValueAccessor, FormsModule, NgControl} from '@angular/forms';
import {HlmFormFieldImports} from '../../ui/ui-form-field-helm/src';
import {HlmInputImports} from '../../ui/ui-input-helm/src';
import {HlmLabelImports} from '../../ui/ui-label-helm/src';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    HlmFormFieldImports,
    FormsModule,
    HlmInputImports,
    HlmLabelImports
  ],
  templateUrl: './input-control.html',
})
export class InputControlComponent implements ControlValueAccessor {
  @Input({required: true}) label!: string;
  @Input() type = 'text';
  @Output() inputChange = new EventEmitter<string>();

  value: any = '';

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
  }

  get control() {
    return this.ngControl?.control;
  }

  get showError() {
    const c = this.control;
    return c && c.invalid && (c.touched || c.dirty);
  }

  get errorMessage(): string | null {
    const c = this.control;
    if (!c?.errors) return null;

    const [key, value] = Object.entries(c.errors)[0];

    switch (key) {
      case 'required':
        return 'Ce champ est requis.';
      case 'email':
        return 'L\'email est invalide.';
      case 'minlength':
        return `La valeur doit faire ${value.requiredLength} caractères au minimum.`;
      case 'maxlength':
        return `La valeur doit faire ${value.requiredLength} caractères au maximum.`;
      default:
        return 'La valeur est invalide.';
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onChange: any = () => {
  };

  onTouched: any = () => {
  };

  onInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.inputChange.emit(val);
  }

  onBlur() {
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
