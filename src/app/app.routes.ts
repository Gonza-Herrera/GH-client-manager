import { Routes } from '@angular/router';

export const routes: Routes = [
{ path: '', redirectTo: 'clients', pathMatch: 'full' },
{ path: 'auth', loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes) },
/* { path: 'clients', loadChildren: () => import('./features/clients/clients.routes').then(m => m.routes) },
{ path: '**', component: NotFoundComponent }, */
];
