import { Component, input } from '@angular/core';
import { CustomIcon } from '../../../../shared/components/icons/custom-icon';
import { Category } from '../../../../core/types/restaurant';
import { HlmButtonImports } from '../../../../shared/components/ui/ui-button-helm/src';
import { HorizontalScroll } from '../../../../shared/components/primitives/horizontal-scroll/horizontal-scroll';

@Component({
  selector: 'app-order-navbar',
  templateUrl: './order-navbar.html',
  imports: [CustomIcon, HlmButtonImports, HorizontalScroll],
})
export class OrderNavbar {
  categories = input<Category[]>([]);
}
