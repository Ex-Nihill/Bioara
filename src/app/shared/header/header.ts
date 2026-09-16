import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

interface UsuarioLogado {
  nome: string;
  email: string;
}
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  getUsuarioLogado(): UsuarioLogado | null {
    const dados = localStorage.getItem('usuarioLogado');
    return dados ? JSON.parse(dados) : null;
  }
}
