import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { User } from './../user';
import { ActivatedRoute, Router, RoutesRecognized, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user_name;
  loggedOut=true;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loggedInName.subscribe(name => {
      if(name !== "logged out"){
        this.user_name = name;
        this.loggedOut=false;
      }
      else{
        this.user_name = null;
        this.loggedOut=true;
      }
    })
  }

}
