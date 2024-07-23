import { Routes } from '@angular/router';
import { businessGuard } from './core/guards/business.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'regestration',
    pathMatch: 'full'
  },
  {path: 'regestration', loadComponent: () => import('./pages/regestration/regestration.component').then((m) => m.RegestrationComponent)},
  {path: 'type-business', loadComponent: () => import('./pages/type-business/type-business.component').then((m) => m.TypeBusinessComponent),canActivate: [businessGuard]},
  {path: 'success', loadComponent: () => import('./pages/success/success.component').then((m) => m.SuccessComponent)},
  {path: '**', redirectTo: 'regestration'}
];
