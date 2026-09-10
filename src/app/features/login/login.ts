import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatToolbarModule, RouterLink, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  erroLogin = signal(false);

  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}
  setupForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this.setupForm();
  }
  getUsuarios(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];
  }
  salvarUsuario(lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }
  onSubmit(): void {
    if (this.formLogin.invalid) return;

    const { email, senha } = this.formLogin.value;
    const usuarios = this.getUsuarios();
    console.log(email);
    console.log(senha);
    console.log(usuarios);
    const usuario = usuarios.find((item) => item.email === email && item.senha === senha);

    if (!usuario) {
      this.erroLogin.set(true);
      return;
    }

    this.erroLogin.set(false);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    this.router.navigate(['/']);
  }
}
