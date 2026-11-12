
import { Injectable, signal } from '@angular/core';
import { ProdutoLoja } from '../models/produto-loja';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly chaveBase = 'bioara-favoritos';
  private readonly lista = signal<ProdutoLoja[]>(this.carregar());
  readonly favoritos = this.lista.asReadonly();

  estaFavorito(produto: ProdutoLoja): boolean {
    return this.lista().some((item) => item.nome === produto.nome && item.imagem === produto.imagem && item.preco === produto.preco);
  }

  alternar(produto: ProdutoLoja): void {
    if (this.estaFavorito(produto)) {
      this.lista.update((itens) => itens.filter((item) => !(item.nome === produto.nome && item.imagem === produto.imagem && item.preco === produto.preco)));
    } else {
      this.lista.update((itens) => [...itens, produto]);
    }
    this.salvar();
  }

  remover(produto: ProdutoLoja): void {
    this.lista.update((itens) => itens.filter((item) => !(item.nome === produto.nome && item.imagem === produto.imagem && item.preco === produto.preco)));
    this.salvar();
  }

  private chaveUsuario(): string {
    return this.chaveBase;
  }

  private carregar(): ProdutoLoja[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(this.chaveUsuario()) ?? '[]') as ProdutoLoja[];
    } catch {
      return [];
    }
  }

  private salvar(): void {
    localStorage.setItem(this.chaveUsuario(), JSON.stringify(this.lista()));
  }
}
