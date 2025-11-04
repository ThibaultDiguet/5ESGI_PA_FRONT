import {Component} from '@angular/core';
import {Navbar} from "../../shared/components/site/navbar/navbar";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  imports: [
    Navbar,
    RouterOutlet
  ],
  templateUrl: './site-layout.html'
})
export class SiteLayout {

}
