import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private token;
  private usersUrl = 'api/users';
  private loginUrl = 'api/login'
  private registerUrl = 'api/register'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
  };

  login(credentials: User): Observable<User>{
    this.http.post<User>(`${this.loginUrl}`, {email:credentials.email, password:credentials.password})
      .subscribe(data => localStorage.setItem('token', data.token));
    return this.http.post<User>(`${this.loginUrl}`, {email:credentials.email, password:credentials.password});
  }


  register(credentials: User): Observable<User>{
    console.log(credentials)
    return this.http.post<User>(`${this.registerUrl}`, credentials);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
}
