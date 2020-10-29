import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
  };

  private registerUrl = 'api/register'

  register(credentials: User): Observable<User>{
    console.log(credentials)
    return this.http.post<User>(`${this.registerUrl}`, credentials);
  }
}
