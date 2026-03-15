import {Component} from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'app-pay-lottie',
  standalone: true,
  templateUrl: './pay.html',
  imports: [LottieComponent],
})
export class PayLottie {
  options: AnimationOptions = {
    path: '/assets/lotties/pay.json',
    loop: true,
    autoplay: true,
  };
}
