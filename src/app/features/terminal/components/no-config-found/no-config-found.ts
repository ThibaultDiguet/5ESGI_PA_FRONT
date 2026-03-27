import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmButton } from '../../../../shared/components/ui/ui-button-helm/src';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-config-found',
  imports: [ReactiveFormsModule, HlmButton],
  templateUrl: './no-config-found.html',
})
export class NoConfigFound {
  router = inject(Router);

  configTerminal() {
    this.router.navigate(['/terminal/config']);
  }
}
