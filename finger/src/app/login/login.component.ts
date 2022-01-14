import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  id = environment.id;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    /* this.findByIdUser(this.id) */
  }

  findByIdUser(id: number) {
    /* console.log(id) */
    this.userService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp;
    });
  }

  cadastrar() {
    this.userService.cadastrar(this.user).subscribe(
      (resp: User) => {
        this.user = resp;

        alert(
          'Usuário cadastrado com sucesso! Por favor, vá para a aba de Log In!'
        );
        this.router.navigate([`/login`]);
      },
      (erro: { status: number }) => {
        if (erro.status == 500) {
          alert('Por favor, preencha corretamente os dados do cadastro!');
        }
      }
    );
  }

  entrar() {
    this.userService.entrar(this.user).subscribe(
      (resp: User) => {
        this.user = resp;
        alert('Usuário logado com sucesso!');
        environment.nome = this.user.nome;
        environment.email = this.user.email;
        environment.senha = this.user.senha;
        environment.id = this.user.id;

        this.router.navigate([`/perfil/${environment.id}`]);
      },
      (erro: { status: number }) => {
        if (erro.status == 500 || erro.status == 400) {
          alert('Usuário ou senha estão incorretos!');
        }
      }
    );
  }
}
