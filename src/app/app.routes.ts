import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { SobreNos } from './features/sobre-nos/sobre-nos';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'produtos',
    loadComponent: () => import('./features/produto/produtos/produtos').then((m) => m.Produtos),
  },
  {
    path: 'sobre-nos',
    loadComponent: () => import('./features/sobre-nos/sobre-nos').then((m) => m.SobreNos),
  },
  
  {
    path: 'conta',
    loadComponent: () => import('./features/conta/conta').then((m) => m.Conta)
  }
  
];
