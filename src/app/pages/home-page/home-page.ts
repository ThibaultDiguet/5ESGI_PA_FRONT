import {Component} from '@angular/core';
import {LoginWrapper} from '../../features/site/components/login-wrapper/login-wrapper';

@Component({
  selector: 'app-home-page',
  imports: [
    LoginWrapper,

  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
}
