import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FavoritosService } from '../../../core/services/favoritos.service';
import { ProdutosHome } from './produtos-home';

describe('ProdutosHome', () => {
  let component: ProdutosHome;
  let fixture: ComponentFixture<ProdutosHome>;

  beforeEach(async () => {
    localStorage.removeItem('bioara-favoritos');

    await TestBed.configureTestingModule({
      imports: [ProdutosHome],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adiciona e remove produtos dos favoritos', () => {
    const produto = component.produtos[0];
    const favoritosService = TestBed.inject(FavoritosService);

    component.alternarFavorito(produto);
    expect(component.estaFavorito(produto)).toBe(true);
    expect(favoritosService.favoritos()).toHaveLength(1);

    component.alternarFavorito(produto);
    expect(component.estaFavorito(produto)).toBe(false);
    expect(favoritosService.favoritos()).toHaveLength(0);
  });
});
