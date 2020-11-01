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
      this.http.get<User>(`${this.usersUrl}/user/searchByEmail/${localStorage.getItem('email')}`, this.httpOptions)
      .subscribe(user => {
        localStorage.setItem('user_name', user.user_name);
        this.loggedInName.emit(user.user_name);
      })
      return this.http.get<User>(`${this.usersUrl}/user/SearchByEmail/${localStorage.getItem('email')}`, this.httpOptions);
    }
  }

  getSearchedUser(user_name: string): Observable<any> {
    return this.http.get<any>(`${this.usersUrl}/user/searchByUser/${user_name}`);
  }

  getFollowers(): Observable<Object> {

    return this.http.get(`${this.usersUrl}/user/${this.user.user_name}/${this.followersUrl}`);
  }


  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()){
      return of([]);
    }

    return this.http.get<User[]>(`${this.usersUrl}/findUser/searchUser?user_name=${term}`);
  }


  follow(user: string){
    return this.http.post(`${this.usersUrl}/user/${localStorage.getItem('user_name')}/followers/add`, {follower:user});
  }

  unfollow(user:string){
    return this.http.delete(`${this.usersUrl}/user/${localStorage.getItem('user_name')}/followers/remove/${user}`)
  }

  logout(){
    this.loggedInName.emit('logged out');
  }

}
