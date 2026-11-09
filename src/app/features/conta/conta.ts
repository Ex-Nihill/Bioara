import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface UsuarioConta {
  nome: string;
  email: string;
  endereco?: string;
  cep?: string | number;
  cpf?: string | number;
  telefone?: string | number;
}

@Component({
  selector: 'app-conta',
  imports: [RouterLink],
  templateUrl: './conta.html',
  styleUrl: './conta.css',
})
export class Conta {
  usuario: UsuarioConta | null = null;

  constructor(private router: Router) {
    this.usuario = this.getUsuarioLogado();
  }

  getUsuarioLogado(): UsuarioConta | null {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
  }

  sair(): void {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}
