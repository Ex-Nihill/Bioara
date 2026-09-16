import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    canActivate: [authGuard],
    loadComponent: () => import('./features/conta/conta').then((m) => m.Conta),
  },
  {
    path: 'carrinho',
    canActivate: [authGuard],
    loadComponent: () => import('./features/carrinho/carrinho').then((m) => m.Carrinho),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./features/cadastro/cadastro').then((m) => m.Cadastro),
  },
];
