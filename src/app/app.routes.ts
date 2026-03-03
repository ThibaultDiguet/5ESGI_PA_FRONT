import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {AdministratorLayout} from './layouts/administrator-layout/administrator-layout';
import {SiteLayout} from './layouts/site-layout/site-layout';
import {InitTerminal} from './pages/terminal/init-terminal/init-terminal';
import {PageNotFound} from './shared/components/primitives/page-not-found/page-not-found';
import {TerminalOrder} from './pages/terminal/terminal-order/terminal-order';
export const routes: Routes = [
  {
    path: 'admin', component: AdministratorLayout, children: [],
  },
  {
    path: 'terminal', children: [
      {'path': '', component: TerminalOrder},
      {'path': 'config', component: InitTerminal}
    ],
  },
  {
    path: 'site/:restaurant_uri', component: SiteLayout, children: [
      {'path': 'login', component: HomePage}
    ],
  },
  {
    path: '**', component: PageNotFound
  },
];
