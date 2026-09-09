import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../core/facades/carrinho.facade';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  carrinhoFacade = inject(CarrinhoFacade);

  quantidadeCarrinho = this.carrinhoFacade.quantidade;
  totalCarrinho = this.carrinhoFacade.total;
}
