import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public formLogin = new FormGroup ({
    nome: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email:new FormControl('', Validators.required),
    senha:new FormControl('',[Validators.required,Validators.minLength(6)])

});
}