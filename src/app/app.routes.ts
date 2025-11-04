import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {AdministratorLayout} from './layouts/administrator-layout/administrator-layout';
import {SiteLayout} from './layouts/site-layout/site-layout';
import {RegisterTerminal} from './pages/register-terminal/register-terminal';

export const routes: Routes = [
  {
    path: 'admin', component: AdministratorLayout, children: [],
  },
  {
    path: 'terminal', component: SiteLayout, children: [
      {'path': 'register', component: RegisterTerminal,},
    ],
  },
  {
    path: 'site', component: SiteLayout, children: [
      {'path': ':name/login', component: HomePage}
    ],
  },
];
