import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-layout/app-layout.component').then((m) => m.AppLayoutComponent),
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      {
        path: 'clients',
        loadChildren: () => import('./features/clients/clients.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes) },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [{ path: '', component: NotFoundComponent }],
  },
];
