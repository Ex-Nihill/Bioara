
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../core/services/favoritos.service';
import { ProdutoLoja } from '../../core/models/produto-loja';
import { CarrinhoFacade } from '../../core/facades/carrinho.facade';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  readonly favoritosService = inject(FavoritosService);
  private readonly carrinho = inject(CarrinhoFacade);

  adicionarAoCarrinho(produto: ProdutoLoja): void {
    this.carrinho.adicionarProduto({
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      descricao: produto.descricao,
      categoria: produto.categoria,
    });
  }
}
