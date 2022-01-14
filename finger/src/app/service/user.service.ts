import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  entrar(userLogin: User): Observable<User> {
    return this.http.post<User>(
      'https://localhost:3000/users/logar',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://localhost:3000/users', user);
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://localhost:3000/users/${id}`);
  }

  atualizar(user: User): Observable<User> {
    return this.http.patch<User>(
      'https://localhost:3000/users/alterar',
      user,
    );
  }
}
