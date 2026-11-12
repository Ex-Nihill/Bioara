
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoFacade } from '../../core/facades/carrinho.facade';
import { PedidosService } from '../../core/services/pedidos.service';

@Component({
  selector: 'app-compra',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './compra.html',
  styleUrl: './compra.css',
})
export class Compra implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly carrinhoFacade = inject(CarrinhoFacade);
  private readonly pedidosService = inject(PedidosService);
  readonly pedidoConfirmado = signal(false);
  private redirecionamentoId?: ReturnType<typeof setTimeout>;

  readonly formularioCompra = this.formBuilder.group({
    nome: ['', Validators.required],
    telefone: ['', Validators.required],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    endereco: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: [''],
    bairro: ['', Validators.required],
    cidade: ['', Validators.required],
    estado: ['', Validators.required],
    pagamento: ['pix', Validators.required],
    numeroCartao: [''],
    validade: [''],
    cvv: [''],
  });

  finalizarCompra(): void {
    if (this.pedidoConfirmado()) {
      return;
    }

    this.pedidosService.registrarCompra(this.carrinhoFacade.itens());
    this.carrinhoFacade.limparCarrinho();
    this.pedidoConfirmado.set(true);
    this.redirecionamentoId = setTimeout(() => {
      void this.router.navigateByUrl('/');
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.redirecionamentoId) {
      clearTimeout(this.redirecionamentoId);
    }
  }
}
