import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user;
  constructor(private http: HttpClient) { }


  private usersUrl = 'api/users';
  private followersUrl = '/followers';
  private currentUser = 'maleke';

  @Output() loggedInName: EventEmitter<any> = new EventEmitter();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
  };

  getUser(): Observable<User> {
      if(localStorage.getItem('email')){
        this.http.get<User>(`${this.usersUrl}/${localStorage.getItem('email')}`, this.httpOptions)
        .subscribe(user => {
          this.loggedInName.emit(user.user_name)
        })
        return this.http.get<User>(`${this.usersUrl}/${localStorage.getItem('email')}`, this.httpOptions);
      }
  }

  getFollowers(): Observable<Object> {

    return this.http.get(`${this.usersUrl}/${this.currentUser}/${this.followersUrl}`);
  }


  logout(){
    this.loggedInName.emit('logged out');
  }

}
