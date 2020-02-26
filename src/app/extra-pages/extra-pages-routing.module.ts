import { Routes, RouterModule } from '@angular/router';

import { Page404Component } from './404/404.component';
import { Page500Component } from './500/500.component';

export const ExtraPagesRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: '404', component: Page404Component },
      { path: '500', component: Page500Component },
    ]
  }
];

export const ExtraPagesRoutingModule = RouterModule.forChild(ExtraPagesRoutes);
