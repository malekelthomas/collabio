import { Input, EventEmitter, Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    user_name: new FormControl('',[Validators.required]),
    first_name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private register: RegisterService) { }

  registration;
  ngOnInit(): void {
  }

  @Output() submitEm: EventEmitter<unknown> = new EventEmitter;
  submit() {
    if (this.form.valid) {
      this.submitEm.emit(this.form.value);
      this.register.register(this.form.value).subscribe(data=>this.registration=data);

    }
  }

  checkType(ting){
    return typeof ting;
  }

}
