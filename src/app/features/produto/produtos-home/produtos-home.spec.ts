import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosHome } from './produtos-home';

describe('ProdutosHome', () => {
  let component: ProdutosHome;
  let fixture: ComponentFixture<ProdutosHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
