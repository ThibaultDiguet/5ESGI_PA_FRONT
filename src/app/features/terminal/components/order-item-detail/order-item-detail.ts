import {Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Item} from '../../../../core/types/restaurant';

@Component({
  selector: 'app-order-item-details',
  standalone: true,
  imports: [CurrencyPipe,],
  templateUrl: './order-item-detail.html'
})
export class OrderItemDetail {
  item = input.required<Item>();
}
