import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

interface Usuario {
  nome: string;
  email: string;
  endereco?: string;
  telefone?: number | string;
  cep?: number | string;
  cpf?: number | string;
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

  validarSenhasIguais(group: AbstractControl): ValidationErrors | null {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;

    if (!senha || !confirmarSenha) {
      return null;
    }

    return senha === confirmarSenha ? null : { senhaDiferente: true };
  }

  setupForm(): void {
    this.formulario = this.fb.group(
      {
        //cadstro de infos pessoais e login

        nome: ['', [Validators.required, Validators.minLength(3)]],

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
      },
      { validators: this.validarSenhasIguais },
    );
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
    if (this.formulario.invalid) return;

    const { nome, email, endereco, senha, confirmarSenha, cep, cpf } = this.formulario.value;

    if (senha !== confirmarSenha) {
      this.formulario.setErrors({ senhaDiferente: true });
      return;
    }

    const usuarios = this.getUsuarios();
    const usuarioCadastrado = {
      nome: String(nome).trim(),
      email: String(email).trim(),
      endereco: String(endereco).trim(),
      senha: String(senha),
      cep: Number(cep),
      cpf: String(cpf),
    };

    usuarios.push(usuarioCadastrado);
    this.salvarUsuario(usuarios);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioCadastrado));
    this.router.navigate(['/conta']);
  }
}
