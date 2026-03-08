import {Component, input} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {Item} from '../../../../core/types/restaurant';
import {HlmButton} from '../../../../shared/components/ui/ui-button-helm/src';

@Component({
  selector: 'app-order-item-details',
  standalone: true,
  imports: [CurrencyPipe, HlmButton],
  templateUrl: './order-item-detail.html'
})
export class OrderItemDetail {
  item = input.required<Item>();
}
