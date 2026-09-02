import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { SobreNos } from './features/sobre-nos/sobre-nos';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'sobre-nos',
    loadComponent: () => import('./features/sobre-nos/sobre-nos').then((m) => m.SobreNos),
  },
  {
    path: 'Produtos',
    loadComponent: () => import('./features/produtos/produtos').then((m) => m.Produtos),
  },
  {
    path: '',
    loadComponent: () => import('./features/conta/conta').then((m) => m.Conta)
  }
  
];
