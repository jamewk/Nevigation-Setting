import { RouterModule, Routes } from '@angular/router';
import { CategoryPoiListComponent } from './page/category-poi/category-poi-list/category-poi-list.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/category-poi', pathMatch: 'full' },
  { path: 'category-poi', component: CategoryPoiListComponent },
  { path: '**', redirectTo: '/category-poi', pathMatch: 'full' },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
