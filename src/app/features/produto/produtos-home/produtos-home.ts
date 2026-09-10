import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';

interface Produto {
  nome: string;
  categoria: string;
  precoOriginal: string;
  preco: string;
  imagem: string;
  avaliacao: number;
}

@Component({
  selector: 'app-produtos-home',
  imports: [RouterLink],
  templateUrl: './produtos-home.html',
  styleUrl: './produtos-home.css',
})
export class ProdutosHome {
  termoBusca = '';
  readonly paginaPromocoes: boolean;
  produtoSelecionado: Produto | null = null;
  mensagemCarrinho = '';
  private carrinhoFacade = inject(CarrinhoFacade);
  private cdr = inject(ChangeDetectorRef);
  private timeoutConfirmacao?: number;

   constructor(rota: ActivatedRoute) {
    this.paginaPromocoes = rota.snapshot.data['promocoes'] === true;
  }
  readonly produtos: Produto[] = [
    {
      nome: 'Creme Nozes',
      categoria: 'Cuidados para o corpo',
      precoOriginal: 'R$ 59,90',
      preco: 'R$ 36,90',
      imagem: '/images/cremenozes.png',
      avaliacao: 3,
    },
    {
      nome: 'Sabonete Banana',
      categoria: 'Sabonetes naturais',
      precoOriginal: 'R$ 49,90',
      preco: 'R$ 27,50',
      imagem: '/images/sabonetebanana.png',
      avaliacao: 5,
    },
    {
      nome: 'Condicionador Tangerina',
      categoria: 'Cabelos',
      precoOriginal: 'R$ 69,90',
      preco: 'R$ 49,90',
      imagem: '/images/tanjerina.png',
      avaliacao: 3,
    },
      {
        nome: 'Shampoo Herbal',
        categoria: 'Shampoo',
        precoOriginal: 'R$ 45,90',
        preco: 'R$ 32,90',
        imagem: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80',
        avaliacao: 3,
      },
      {
        nome: 'Shampoo Nutritivo',
        categoria: 'Shampoo',
        precoOriginal: 'R$ 52,90',
        preco: 'R$ 39,90',
        imagem: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80',
        avaliacao: 3,
      },
      {
        nome: 'Hidratante Corporal',
        categoria: 'Hidratante',
        precoOriginal: 'R$ 48,90',
        preco: 'R$ 35,90',
        imagem: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=500&q=80',
        avaliacao: 3,
      },
      {
        nome: 'Hidratante Facial',
        categoria: 'Hidratante',
        precoOriginal: 'R$ 64,90',
        preco: 'R$ 49,90',
        imagem: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80',
        avaliacao: 3,
      },
  ];
  get produtosFiltrados(): Produto[] {
    const termo = this.termoBusca.trim().toLowerCase();
    return this.produtos.filter((produto) =>
      `${produto.nome} ${produto.categoria}`.toLowerCase().includes(termo),
    );
  }
  get produtosExibidos(): Produto[] {
    return this.produtosFiltrados.slice(0, 3);
  }

  obterEstrelas(avaliacao: number): string {
    return `${'★'.repeat(Math.round(avaliacao))}${'☆'.repeat(5 - Math.round(avaliacao))}`;
  }

  mostrarConfirmacaoCarrinho(produto: Produto): void {
    this.mensagemCarrinho = `${produto.nome} adicionado ao carrinho!`;
    this.cdr.detectChanges();

    if (this.timeoutConfirmacao) {
      clearTimeout(this.timeoutConfirmacao);
    }

    this.timeoutConfirmacao = setTimeout(() => {
      this.mensagemCarrinho = '';
      this.cdr.detectChanges();
    }, 1800);
  }

  abrirDetalhes(produto: Produto): void {
    this.produtoSelecionado = produto;
  }

  fecharDetalhes(): void {
    this.produtoSelecionado = null;
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.carrinhoFacade.adicionarProduto({
      nome: produto.nome,
      preco: this.converterPreco(produto.preco),
    });
    this.mostrarConfirmacaoCarrinho(produto);
    this.fecharDetalhes();
  }

  private converterPreco(valorFormatado: string): number {
    return Number(
      valorFormatado
        .replace(/[^\d,.-]/g, '')
        .replace(/\./g, '')
        .replace(',', '.'),
    );
  }
}
