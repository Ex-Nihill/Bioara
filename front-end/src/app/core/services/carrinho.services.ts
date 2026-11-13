import { computed, inject, Injectable, PLATFORM_ID, signal, effect } from '@angular/core';
import { ItemCarrinhoType } from '../models/item-carrinho';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly chaveStorage = 'minha-loja-carrinho';
  private readonly platformId = inject(PLATFORM_ID);
  private carrinho = signal<ItemCarrinhoType[]>(this.carregarCarrinhoSalvo());

  constructor() {
    effect(() => {
      this.salvarCarrinho(this.carrinho());
    });
  }

  itens = computed(() => this.carrinho());
  public quantidade = computed(() =>
    this.carrinho().reduce((total, item) => total + (item.quantidade ?? 1), 0),
  );
  public total = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco * (item.quantidade ?? 1), 0),
  );
  carrinhoVazio = computed(() => this.carrinho().length === 0);

  public adicionar(produto: ItemCarrinhoType) {
    this.carrinho.update((lista) => {
      const itemExistente = lista.find(
        (item) => item.nome === produto.nome && item.preco === produto.preco,
      );

      if (itemExistente) {
        return lista.map((item) =>
          item === itemExistente
            ? { ...item, quantidade: (item.quantidade ?? 1) + (produto.quantidade ?? 1) }
            : item,
        );
      }

      return [...lista, { ...produto, quantidade: produto.quantidade ?? 1 }];
    });
  }

  public diminuirQuantidade(produto: ItemCarrinhoType) {
    this.carrinho.update((lista) =>
      lista.flatMap((item) => {
        if (item !== produto) {
          return [item];
        }

        const quantidade = item.quantidade ?? 1;
        return quantidade > 1 ? [{ ...item, quantidade: quantidade - 1 }] : [];
      }),
    );
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
      const itensSalvos = JSON.parse(dadosSalvos) as ItemCarrinhoType[];
      return itensSalvos.reduce<ItemCarrinhoType[]>((itens, item) => {
        const itemExistente = itens.find(
          (atual) => atual.nome === item.nome && atual.preco === item.preco,
        );
        const quantidade = item.quantidade ?? 1;

        if (itemExistente) {
          itemExistente.quantidade = (itemExistente.quantidade ?? 1) + quantidade;
          return itens;
        }

        return [...itens, { ...item, quantidade }];
      }, []);
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
