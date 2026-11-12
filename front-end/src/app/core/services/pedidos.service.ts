
import { Injectable, signal } from '@angular/core';
import { ItemCarrinhoType } from '../models/item-carrinho';
import { Pedido } from '../models/pedidos';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private readonly chaveBase = 'bioara-pedidos';
  private readonly lista = signal<Pedido[]>(this.carregar());
  readonly pedidos = this.lista.asReadonly();

  registrarCompra(itens: ItemCarrinhoType[]): void {
    const agora = new Date();
    const entrega = new Date(agora);
    entrega.setDate(entrega.getDate() + 7);
    const pedido: Pedido = {
      id: `BIO-${Date.now().toString().slice(-8)}`,
      dataCompra: agora.toISOString(),
      previsaoEntrega: entrega.toISOString(),
      total: itens.reduce((soma, item) => soma + item.preco * (item.quantidade ?? 1), 0),
      status: 'Pedido confirmado',
      itens: itens.map((item) => ({
        nome: item.nome,
        descricao: item.descricao ?? `Produto BIOARA da categoria ${item.categoria ?? 'cuidados pessoais'}.`,
        imagem: item.imagem ?? '/logo.png',
        preco: item.preco,
        quantidade: item.quantidade ?? 1,
      })),
    };
    this.lista.update((pedidos) => [pedido, ...pedidos]);
    this.salvar();
  }

  private chaveUsuario(): string {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) return `${this.chaveBase}-visitante`;
    try {
      const dados = JSON.parse(usuario) as { email?: string; nome?: string };
      return `${this.chaveBase}-${(dados.email ?? dados.nome ?? 'visitante').toLowerCase()}`;
    } catch {
      return `${this.chaveBase}-visitante`;
    }
  }

  private carregar(): Pedido[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(this.chaveUsuario()) ?? '[]') as Pedido[];
    } catch {
      return [];
    }
  }

  private salvar(): void {
    localStorage.setItem(this.chaveUsuario(), JSON.stringify(this.lista()));
  }
}
