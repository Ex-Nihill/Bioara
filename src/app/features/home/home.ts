import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produtos } from '../produto/produtos/produtos';
import { ProdutosHome } from '../produto/produtos-home/produtos-home';
@Component({
  selector: 'app-home',
  imports: [ProdutosHome],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  
  imagemAtual = 0;

  imagens = ['image1.jpeg', 'image2.jpeg', 'image3.jpeg'];

  private intervalo?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.iniciarCarrossel();
  }

  iniciarCarrossel(): void {



    this.intervalo = setInterval(() => {
      this.proxima();
    }, 4000);
  }

  proxima(): void {
    this.imagemAtual = (this.imagemAtual + 1) % this.imagens.length;
  }

  anterior(): void {
    this.imagemAtual = (this.imagemAtual - 1 + this.imagens.length) % this.imagens.length;
  }

  irPara(index: number): void {
    this.imagemAtual = index;
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }
}
