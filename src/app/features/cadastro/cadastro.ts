import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

interface Usuario {
  nome: string;
  email: string;
  endereco: string;
  telefone: number;
  cep: number;
  cpf: number;
  senha: string;
}
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, MatAnchor, RouterLink, MatButton],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}
  setupForm(): void {
    this.formulario = this.fb.group({
      //cadstro de infos pessoais e login

      nome: ['', [Validators.required, Validators.minLength(6)]],

      email: ['', [Validators.required, Validators.email]],

      senha: ['', [Validators.required, Validators.minLength(6)]],

      confirmarSenha: ['', [Validators.required]],

      //endereço

      // telefone: ['', [
      //   Validators.required
      // ]],

      cpf: ['', [Validators.required]],

      cep: ['', [Validators.required]],

      endereco: ['', [Validators.required]],
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
    console.log(this.formulario);

    if (this.formulario.invalid) return;

    const { nome, email, endereco, senha, telefone, confirmarSenha, cep, cpf } =
      this.formulario.value;
    if (senha !== confirmarSenha) {
      this.formulario.get('confirmarSenha')?.setErrors({ senhaDiferente: true });
      return;
    }

    const usuarios = this.getUsuarios();
    console.log('TESTE1', usuarios);

    usuarios.push({ nome, email, endereco, senha, telefone, cep, cpf });
    console.log('TESTE2', usuarios);
    this.salvarUsuario(usuarios);
    this.router.navigate(['/login']);
  }
}
