import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list-page/list-page.component').then((m) => m.ListPageComponent),
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/new-page/new-page.component').then((m) => m.NewPageComponent),
      },
    ],
  },
];
