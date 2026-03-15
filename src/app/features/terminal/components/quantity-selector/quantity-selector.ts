import {Component, input, OnInit, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgIconComponent, provideIcons} from '@ng-icons/core';
import {lucideMinus, lucidePlus} from '@ng-icons/lucide';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule, NgIconComponent, HlmButtonImports],
  providers: [provideIcons({lucideMinus, lucidePlus})],
  templateUrl: './quantity-selector.html',
  styles: [`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
  `]
})

export class QuantitySelector implements OnInit {
  initialValue = input<number>(1);
  min = input<number>(1);
  max = input<number>(99);
  value = signal<number>(1);

  valueChanged = output<number>();

  ngOnInit() {
    this.value.set(this.initialValue());
  }

  increment() {
    this.value.update(v => {
      const newValue = v + 1;
      if (newValue <= this.max()) {
        this.valueChanged.emit(newValue);
        return newValue;
      }
      return v;
    });
  }

  decrement() {
    this.value.update(v => {
      const newValue = v - 1;
      if (newValue >= this.min()) {
        this.valueChanged.emit(newValue);
        return newValue;
      }
      return v;
    });
  }
}
