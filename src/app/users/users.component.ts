import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getUsers();
    this.getFollowers();
  }

  users;
  followers;

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users)
  }

  getFollowers(): void {
    this.userService.getFollowers()
      .subscribe(followers => this.followers = followers)
  }
}
