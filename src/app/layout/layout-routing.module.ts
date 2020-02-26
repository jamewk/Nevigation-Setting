import { ManageUserComponent } from './../page/user/manage-user/manage-user.component';
import { ListUserComponent } from './../page/user/list-user/list-user.component';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ExListComponent } from '../page/example/ex-list/ex-list.component';
import { ExCreateComponent } from '../page/example/ex-create/ex-create.component';
import { LoginComponent } from '../page/example/login/login.component';
import { CategoryPoiListComponent } from '../page/category-poi/category-poi-list/category-poi-list.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'articles', component: ExListComponent },
      { path: 'articles/create', component: ExCreateComponent },
      { path: 'user', component: ListUserComponent },
      { path: 'user/create', component: ManageUserComponent },
      { path: 'user/:id', component: ManageUserComponent },
      { path: 'user/:id/edit', component: ManageUserComponent },
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
