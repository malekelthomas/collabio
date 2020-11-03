import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';
import { ReplyComment } from './replyComment';
import { InitComment } from './comment';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private usersUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}),
  };

  getPosts(): Observable<Post>{
    return this.http.get<Post>(`${this.usersUrl}/user/${localStorage.getItem('user_name')}/posts`)
  }

}
