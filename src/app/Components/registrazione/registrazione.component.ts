import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {
  formGroup: FormGroup;
  elems: string[] = ['Username', 'E-mail', 'Password', 'Conferma', 'First Name', 'Last Name'];
  constructor() {
    this.formGroup = new FormGroup({
      'E-mail':new FormControl('', [Validators.email, Validators.required]),
      'Password': new FormControl('',[Validators.required, Validators.pattern('[a-zA-z0-9]+'), Validators.minLength(8)]),
      'First Name': new FormControl(''),
      'Last Name': new FormControl('')
    });
    this.formGroup.addControl('Username', new FormControl(''));
    this.formGroup.addControl('Conferma', new FormControl('',[this.check_password()]),)
  }

  ngOnInit(): void {
  }

  f() {
    return this.formGroup.controls;
  }

  check_password():ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null =>{
      var pass = this.f()['Password'].value;
      var test = control.value != pass;
      return test ?  {diverse:control.value}:null;
    }
  }

  registrati(){
    console.log(this.formGroup);
  }

}
