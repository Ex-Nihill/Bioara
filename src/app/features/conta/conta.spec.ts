import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conta } from './conta';

describe('Conta', () => {
  let component: Conta;
  let fixture: ComponentFixture<Conta>;

  beforeEach(async () => {
    localStorage.clear();
    localStorage.setItem(
      'usuarioLogado',
      JSON.stringify({
        nome: 'Maria Silva',
        email: 'maria@email.com',
        endereco: 'Rua das Flores, 123',
        cpf: '12345678900',
        cep: '12345678',
      }),
    );

    await TestBed.configureTestingModule({
      imports: [Conta],
    }).compileComponents();

    fixture = TestBed.createComponent(Conta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logged user data', () => {
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Maria Silva');
    expect(text).toContain('maria@email.com');
    expect(text).toContain('Rua das Flores, 123');
    expect(text).toContain('12345678900');
  });
});
