import { AuthService } from './../auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private location: Location, private auth:AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }
  logout(){
    this.auth.logout();
  }

}
