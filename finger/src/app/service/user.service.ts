import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  entrar(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/users/logar',
      user
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users/cadastrar', user);
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  atualizar(user: User, id: number): Observable<User> {
    return this.http.put<User>(
      `http://localhost:3000/users/alterar/${id}`,
      user,
    );
  }

  deletar(id: number){
    return this.http.delete(`http://localhost:3000/users/deletar/${id}`)
  }
}
