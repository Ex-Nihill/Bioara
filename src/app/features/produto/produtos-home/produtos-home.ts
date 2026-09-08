import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

interface Produto {
  nome: string;
  categoria: string;
  precoOriginal: string;
  preco: string;
  imagem: string;
}

@Component({
  selector: 'app-produtos-home',
  imports: [MatAnchor],
  templateUrl: './produtos-home.html',
  styleUrl: './produtos-home.css',
})
export class ProdutosHome {
  termoBusca = '';
  quantidadeVisivel = 3;
  readonly paginaPromocoes: boolean;

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
    },
    {
      nome: 'Sabonete Banana',
      categoria: 'Sabonetes naturais',
      precoOriginal: 'R$ 49,90',
      preco: 'R$ 27,50',
      imagem: '/images/sabonetebanana.png',
    },
    {
      nome: 'Condicionador Tangerina',
      categoria: 'Cabelos',
      precoOriginal: 'R$ 69,90',
      preco: 'R$ 49,90',
      imagem: '/images/tanjerina.png',
    },
      {
        nome: 'Shampoo Herbal',
        categoria: 'Shampoo',
        precoOriginal: 'R$ 45,90',
        preco: 'R$ 32,90',
        imagem: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80',
      },
      {
        nome: 'Shampoo Nutritivo',
        categoria: 'Shampoo',
        precoOriginal: 'R$ 52,90',
        preco: 'R$ 39,90',
        imagem: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=500&q=80',
      },
      {
        nome: 'Hidratante Corporal',
        categoria: 'Hidratante',
        precoOriginal: 'R$ 48,90',
        preco: 'R$ 35,90',
        imagem: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=500&q=80',
      },
      {
        nome: 'Hidratante Facial',
        categoria: 'Hidratante',
        precoOriginal: 'R$ 64,90',
        preco: 'R$ 49,90',
        imagem: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80',
      },
  ];
  get produtosFiltrados(): Produto[] {
    const termo = this.termoBusca.trim().toLowerCase();
    return this.produtos.filter((produto) =>
      `${produto.nome} ${produto.categoria}`.toLowerCase().includes(termo),
    );
  }
 get produtosExibidos(): Produto[] {
    return this.produtosFiltrados.slice(0, this.quantidadeVisivel);
  }
  verMais(): void {
    this.quantidadeVisivel += 3;
  }
   adicionarAoCarrinho(produto: any): void {
    // Lógica para adicionar o produto ao carrinho
    console.log(`Produto adicionado ao carrinho: ${produto.nome}`);
  }

}
