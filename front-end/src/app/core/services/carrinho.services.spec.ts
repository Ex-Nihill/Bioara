import { TestBed } from '@angular/core/testing';
import { CarrinhoService } from './carrinho.services';

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  beforeEach(() => {
    localStorage.removeItem('minha-loja-carrinho-visitante');
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('groups matching products and updates quantity and total', () => {
    const produto = { nome: 'Sabonete', preco: 12.5 };

    service.adicionar(produto);
    service.adicionar(produto);

    expect(service.itens()).toEqual([{ ...produto, quantidade: 2 }]);
    expect(service.quantidade()).toBe(2);
    expect(service.total()).toBe(25);

    service.diminuirQuantidade(service.itens()[0]);

    expect(service.itens()).toEqual([{ ...produto, quantidade: 1 }]);
    expect(service.quantidade()).toBe(1);
    expect(service.total()).toBe(12.5);
  });

  it('removes the item when its quantity is decreased from one', () => {
    service.adicionar({ nome: 'Sabonete', preco: 12.5 });

    service.diminuirQuantidade(service.itens()[0]);

    expect(service.itens()).toEqual([]);
    expect(service.carrinhoVazio()).toBe(true);
  });
});
