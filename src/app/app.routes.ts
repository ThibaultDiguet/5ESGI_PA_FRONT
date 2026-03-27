import {Routes} from '@angular/router';
import {AdministratorLayout} from './layouts/administrator-layout/administrator-layout';
import {SiteLayout} from './layouts/site-layout/site-layout';
import {InitTerminal} from './pages/terminal/init-terminal/init-terminal';
import {PageNotFound} from './pages/page-not-found/page-not-found';
import {TerminalOrder} from './pages/terminal/terminal-order/terminal-order';
import {CreateAccountWrapper} from './features/site/components/create-account-wrapper/create-account-wrapper';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdministratorLayout,
    children: [],
  },
  {
    path: 'terminal',
    children: [
      {path: '', component: TerminalOrder},
      {path: 'config', component: InitTerminal},
    ],
  },
  {
    path: 'site/:restaurant_uri',
    component: SiteLayout,
    children: [{path: '', component: CreateAccountWrapper}],
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
