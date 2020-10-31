import { UserService } from './user.service';
import { User } from './user';
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<User> {

  constructor(private user: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.user.getUser();
  }
}
