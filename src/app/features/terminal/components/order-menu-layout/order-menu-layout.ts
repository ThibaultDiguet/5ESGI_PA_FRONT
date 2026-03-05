import {Component} from '@angular/core';
import {OrderNavbar} from '../order-navbar/order-navbar';
import {OrderHeader} from '../order-header/order-header';
import {OrderBody} from '../order-body/order-body';
@Component({
  selector: 'app-order-menu-layout',
  templateUrl: './order-menu-layout.html',
  imports: [OrderNavbar, OrderHeader, OrderBody],
})
export class OrderMenuLayout {}
