import { computed, inject, Injectable, PLATFORM_ID, signal, effect } from '@angular/core';
import { ItemCarrinhoType } from '../models/item-carrinho';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  constructor() {
    effect(() => {
      this.salvarCarrinho(this.carrinho());
    });
  }

  private carrinho = signal<ItemCarrinhoType[]>(this.carregarCarrinhoSalvo());
  private readonly chaveStorage = 'minha-loja-carrinho';
  private readonly platformId = inject(PLATFORM_ID);

  itens = computed(() => this.carrinho());
  public quantidade = computed(() => this.carrinho().length);
  public total = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0),
  );
  carrinhoVazio = computed(() => this.carrinho().length === 0);

  public adicionar(produto: ItemCarrinhoType) {
    this.carrinho.update((lista) => [...lista, produto]);
  }

  public deletar(produto: ItemCarrinhoType) {
    const newList = this.carrinho().filter((item) => item !== produto);
    this.carrinho.set(newList);
  }

  public limpar() {
    this.carrinho.set([]);
  }

  public carregarCarrinhoDoUsuarioAtual(): void {
    this.carrinho.set(this.carregarCarrinhoSalvo());
  }

  private getChaveCarrinhoAtual(): string {
    if (!this.estaNoNavegador()) {
      return this.chaveStorage;
    }

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
      return `${this.chaveStorage}-visitante`;
    }

    try {
      const usuario = JSON.parse(usuarioLogado) as { email?: string; nome?: string };
      const identificador = usuario.email ?? usuario.nome ?? 'visitante';
      return `${this.chaveStorage}-${String(identificador).trim().toLowerCase()}`;
    } catch {
      return `${this.chaveStorage}-visitante`;
    }
  }

  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private carregarCarrinhoSalvo(): ItemCarrinhoType[] {
    if (!this.estaNoNavegador()) {
      return [];
    }

    const chave = this.getChaveCarrinhoAtual();
    const dadosSalvos = localStorage.getItem(chave);
    if (!dadosSalvos) {
      return [];
    }

    try {
      return JSON.parse(dadosSalvos) as ItemCarrinhoType[];
    } catch {
      return [];
    }
  }

  private salvarCarrinho(itens: ItemCarrinhoType[]) {
    if (!this.estaNoNavegador()) {
      return;
    }

    const chave = this.getChaveCarrinhoAtual();
    localStorage.setItem(chave, JSON.stringify(itens));
  }
}
