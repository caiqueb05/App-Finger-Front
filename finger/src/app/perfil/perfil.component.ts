import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  user: User = new User();
  /* id: number */

  nome = environment.nome;
  email = environment.email;
  senha = environment.senha;
  id = environment.id;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* this.findByIdUser(this.id) */
    this.id = this.route.snapshot.params['id'];
  }

  findByIdUser(id: number) {
    console.log(id);
    this.userService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp;
    });
  }

  editarUsuario() {
    this.user.id = this.id;
    this.user.nome = this.nome;
    this.user.email = this.email;
    this.user.senha = this.senha;
    this.userService
      .atualizar(this.user, this.user.id)
      .subscribe((resp: User) => {
        this.user = resp;
        alert('Usuario atualizado com sucesso! Faça o login novamente!');
        this.router.navigate(['/login']);
      });
  }

  deletarUsuario(id: number) {
    console.log(id);
    alert('Tem certeza que você quer excluir este usuário?');
    this.userService.deletar(id).subscribe(() => {
      alert('Usuário excluído com sucesso!');
      this.router.navigate(['/login']);
    });
  }
}
