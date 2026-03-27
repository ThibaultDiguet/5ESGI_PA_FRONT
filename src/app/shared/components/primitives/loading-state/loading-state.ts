import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSpinner } from '../../icons/icon-spinner';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule, IconSpinner],
  templateUrl: './loading-state.html',
})
export class LoadingState {
  message = input<string>('chargement en cours');
}
