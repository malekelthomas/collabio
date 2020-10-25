import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private usersUrl = 'api/users';
  private followersUrl = '/followers';
  private currentUser = 'maleke';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  getUsers(): Observable<Object> {

      return this.http.get(this.usersUrl, this.httpOptions);
  }

  getFollowers(): Observable<Object> {

    return this.http.get(`${this.usersUrl}/${this.currentUser}/${this.followersUrl}`);
  }

}
