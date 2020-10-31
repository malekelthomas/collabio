import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getFollowers();
  }



  user;
  followers;

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
    this.userService.getUser()
      .subscribe(user => {
        this.user = user.user_name
        localStorage.setItem('user_name', `${user.user_name}`)
        },
        error => this.checkError(error)
      )
  }

  getFollowers(): void {
    this.userService.getFollowers()
      .subscribe(followers => {
        if(followers){
            this.followers = followers
          }
        },
        error => this.checkError(error)
      )}
}
