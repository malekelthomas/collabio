import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor() { }

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
