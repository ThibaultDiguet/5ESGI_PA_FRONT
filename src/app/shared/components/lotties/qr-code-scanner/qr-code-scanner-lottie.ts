import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-qr-code-scanner-lottie',
  standalone: true,
  templateUrl: './qr-code-scanner-lottie.html',
  imports: [LottieComponent],
})
export class QrCodeScannerLottie {
  options: AnimationOptions = {
    path: '/assets/lotties/qr-code-scanner.json',
    loop: true,
    autoplay: true,
  };
}
