import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{


  subscription;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }




  user;
  loggedIn;
  followers = [];
  following = [];
  currentUserFollowing;
  checkoutUser;

  checkError(error: HttpErrorResponse): boolean{
    if (error instanceof HttpErrorResponse){
      this.router.navigate(['/login']);
      return true;
    }
    else{
      console.error(error);
      return false;
    }

  }

  getUser(): void {
    this.route.queryParams.subscribe(val => {
      this.loggedIn = localStorage.getItem('user_name'); // currently logged in user
      if(val.user_name){ //if querying for another user
        this.userService.getSearchedUser(val.user_name)
          .subscribe(user => {
            this.user = user.user_name; // set user to searched user
            this.followers = user.followers;
            this.following = user.following;
            if(user.followers.includes(this.loggedIn)){
              this.currentUserFollowing = true;
            }
          })
      }
      else{ //if on the logged in user's home page
        this.userService.getUser()
          .subscribe(user => {
            this.loggedIn = localStorage.getItem('user_name');
            this.user = user.user_name;
            this.followers = user.followers;
            this.following = user.following;
            },
            error => this.checkError(error)
          )
      }
  });
}


  follow(){
    console.log(this.user)
    this.userService.follow(this.user).subscribe();
    this.router.navigate(['/users'], {queryParams:{user_name:this.user}});


  }

  unfollow(){
    console.log(this.user)
    this.userService.unfollow(this.user).subscribe();
    this.router.navigate(['/users'], {queryParams:{user_name:this.user}});
  }
}
