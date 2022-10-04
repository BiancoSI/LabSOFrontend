import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Client } from '../../Object/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {
  formGroup: FormGroup;
  elems: string[] = ['Username', 'E-mail', 'Password', 'Conferma', 'First Name', 'Last Name'];
  constructor(private _snackbar : MatSnackBar, private router:Router, private auth:AuthService) {
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
    console.log(this.formGroup.controls);
    var cl:Client={
      email:this.f()['E-mail'].value,
      firstName: this.f()['First Name'].value,
      lastName:this.f()['Last Name'].value, 
      password: this.f()['Password'].value,
      username: this.f()['E-mail'].value,
    };  
    this.auth.registra(cl, this.afterRegistrazione.bind(this));
  }

  afterRegistrazione(response:any, status:boolean){
    if(status){
      this._snackbar.open('Registrazione avvenuta.', '', {duration:1200}).afterDismissed().subscribe({
        next: (response:any)=> {
          this.router.navigate(['login']);
        }
      })
    }else{
      this._snackbar.open('Errore : '+response.error['message'], 'Undo');
    }
  }

}
