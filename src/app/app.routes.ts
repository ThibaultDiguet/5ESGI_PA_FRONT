import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout/main-layout';
import {HomePage} from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {'path': '', component: HomePage}
    ]
  }
];
