import { User } from './../user';
import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: User = null;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private loginS: LoginService) { }

  ngOnInit(): void {
    this.loggedIn;
  }

  @Output() submitEm: EventEmitter<unknown> = new EventEmitter;
  submit() {
    if (this.form.valid) {
      this.submitEm.emit(this.form.value);
      this.loginS.login(this.form.value).subscribe(user => console.log(this.loggedIn = user));
    }
  }




}
