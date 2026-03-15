import {Component} from '@angular/core';
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'app-success-check-lottie',
  standalone: true,
  templateUrl: './success-check.html',
  imports: [LottieComponent],
})
export class SuccessCheckLottie {
  options: AnimationOptions = {
    path: '/assets/lotties/success_check.json',
    loop: true,
    autoplay: true,
  };
}
