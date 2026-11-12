
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../core/services/pedidos.service';

@Component({
  selector: 'app-minhas-compras',
  imports: [RouterLink],
  templateUrl: './minhas-compras.html',
  styleUrl: './minhas-compras.css',
})
export class MinhasCompras {
  readonly pedidosService = inject(PedidosService);

  formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(data));
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
