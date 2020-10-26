import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private loginS: LoginService) { }

  ngOnInit(): void {
    this.submit();
  }

  @Output() submitEm: EventEmitter<unknown> = new EventEmitter;
  submit() {
    if (this.form.valid) {
      this.submitEm.emit(this.form.value);
      console.log(this.form.value)
    }
  }


}
