import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
{ path: '', redirectTo: 'clients', pathMatch: 'full' },
{ path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes) },
{ path: 'clients', loadChildren: () => import('./features/clients/clients.routes').then(m => m.routes) },
{ path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
