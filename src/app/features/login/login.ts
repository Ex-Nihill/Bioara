import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  erroLogin = signal(false);

  //estrutura para modifivar senha
  
  exibirEsqueciSenha = signal(false);
  erroEsqueci = signal(false);
  sucessoEsqueci = signal(false);


  formLogin!: FormGroup;
   formEsqueci!: FormGroup; // Novo formulário para alteração de senha
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}
  setupForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.formEsqueci = this.fb.group({
      emailRecuperacao: ['', [Validators.required, Validators.email]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]]
    })
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
  onModificarSenha(): void {
    if (this.formEsqueci.invalid) return;
    const {emailRecuperacao, novaSenha} = this.formEsqueci.value;
    const usuarios = this.getUsuarios();
    const usuarioIndex = usuarios.findIndex((item) => item.email === emailRecuperacao);

    if (usuarioIndex === -1){
      this.erroEsqueci.set(true);
      this.sucessoEsqueci.set(false);
      return;
    }
    usuarios[usuarioIndex].senha = novaSenha;
    //atualiza a lista de dados no localstorage
    this.salvarUsuario(usuarios);

    this.erroEsqueci.set(false);
    this.sucessoEsqueci.set(true);
    this.formEsqueci.reset();
  }

  abrirEsqueciSenha(): void {
    this.exibirEsqueciSenha.set(true);
    this.erroLogin.set(false);
    this.erroEsqueci.set(false);
    this.sucessoEsqueci.set(false);
  }

  voltarParaLogin(): void {
    this.exibirEsqueciSenha.set(false);
    this.erroLogin.set(false);
    this.erroEsqueci.set(false);
    this.sucessoEsqueci.set(false);
    this.formLogin.reset();
  }
}
