import { Router } from '@angular/router';
import { User } from './../user';
import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Token } from './../token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn;
  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  token: Token = {token:""};

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loggedIn;
  }

  @Output() submitEm: EventEmitter<unknown> = new EventEmitter;
  submit() {
    if (this.form.valid) {
      this.submitEm.emit(this.form.value);
      this.auth.login(this.form.value)
      .subscribe(
        res => {
          this.loggedIn=res
          this.checkLoggedIn()
        }
        );
      }
  }

  checkType(ting){
    return typeof ting;
  }

  checkLoggedIn(){
    if (typeof (this.loggedIn) == typeof this.token) {
      console.log("deh yah")
      if (!this.loggedIn.message) {
        this.router.navigate(['/users']);
      }
    }
  }





}
