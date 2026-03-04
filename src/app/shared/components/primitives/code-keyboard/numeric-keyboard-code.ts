import { Component, input, output, signal } from '@angular/core';
import { HlmInputImports } from '../../ui/ui-input-helm/src';
import { HlmButtonImports } from '../../ui/ui-button-helm/src';
import { IconClose } from '../../icons/icon-close';
import { IconBackspace } from '../../icons/icon-backspace';

@Component({
  selector: 'app-numeric-keyboard-code',
  standalone: true,
  templateUrl: './numeric-keyboard-code.html',
  imports: [HlmInputImports, HlmButtonImports, IconClose, IconBackspace],
})
export class NumericKeyboardCode {
  id = input<string>('code');
  placeholder = input<string>('------');
  maxDigits = input<number>(6);

  // Événement pour envoyer la valeur au parent
  valueChange = output<string>();

  // État interne réactif
  protected code = signal<string>('');

  protected readonly digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  protected addDigit(digit: string): void {
    if (this.code().length < this.maxDigits()) {
      this.code.update((current) => current + digit);
      this.valueChange.emit(this.code());
    }
  }

  protected deleteLast(): void {
    this.code.update((current) => current.slice(0, -1));
    this.valueChange.emit(this.code());
  }

  protected clearAll(): void {
    this.code.set('');
    this.valueChange.emit(this.code());
  }
}
