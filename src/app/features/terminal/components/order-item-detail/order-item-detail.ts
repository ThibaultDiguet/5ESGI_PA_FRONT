import {Component, input, output, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Item} from '../../../../core/types/restaurant';
import {QuantitySelector} from '../quantity-selector/quantity-selector';

@Component({
  selector: 'app-order-item-details',
  standalone: true,
  imports: [CurrencyPipe, QuantitySelector,],
  templateUrl: './order-item-detail.html'
})
export class OrderItemDetail {
  item = input.required<Item>();
  amount = signal<number>(1);
  quantityChanged = output<number>();

  protected onQuantityChange(value: number) {
    this.amount.set(value);
    this.quantityChanged.emit(value);
  }
}
