import {Routes} from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {AdministratorLayout} from './layouts/administrator-layout/administrator-layout';
import {SiteLayout} from './layouts/site-layout/site-layout';
import {InitTerminal} from './pages/terminal/init-terminal/init-terminal';
import {OrderTerminalLayer} from './features/terminal/order-terminal-layer/order-terminal-layer';
import {PageNotFound} from './shared/components/primitives/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: 'admin', component: AdministratorLayout, children: [],
  },
  {
    path: 'terminal', children: [
      {'path': 'config', component: InitTerminal},
      {'path': '', component: OrderTerminalLayer}
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
