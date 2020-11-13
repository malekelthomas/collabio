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
    return this.http.get<Post>(`${this.usersUrl}/user/${localStorage.getItem('user_name')}/posts`);
  }

  getOtherUserPosts(user_name): Observable<Post>{
    return this.http.get<Post>(`${this.usersUrl}/user/${user_name}/posts`);
  }

  createPost(post: Post): Observable<Post>{
    return this.http.post<Post>(`${this.usersUrl}/user/${localStorage.getItem('user_name')}/posts/create`, post);
  }

  likePost(post: Post, post_author, liker): Observable<Post>{
    return this.http.put<Post>(`${this.usersUrl}/user/${post_author}/posts/like`, {post,"liker":liker});
  }
  unlikePost(post: Post, post_author, unliker): Observable<Post>{
    return this.http.put<Post>(`${this.usersUrl}/user/${post_author}/posts/unlike`, {post,"unliker":unliker});
  }

}
