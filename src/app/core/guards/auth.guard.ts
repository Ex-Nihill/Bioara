import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    return router.createUrlTree(['/login']);
  }

  try {
    const usuario = JSON.parse(usuarioLogado);

    if (usuario?.email && usuario?.nome) {
      return true;
    }

    localStorage.removeItem('usuarioLogado');
    return router.createUrlTree(['/login']);
  } catch {
    localStorage.removeItem('usuarioLogado');
    return router.createUrlTree(['/login']);
  }
};
