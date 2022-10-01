import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../../Services/AuthService/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../Object/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading!:boolean;
  error!:boolean;
  message!:string;

  formGroup:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  constructor(private router:Router, private authservice:AuthService, private route:ActivatedRoute) {}

  ngOnInit(): void { 
  }

  onSubmit(){
    var username = this.formGroup.controls['username'].value;
    var password = this.formGroup.controls['password'].value;
    
    this.authservice.login(username, password, this.afterLogin.bind(this));
    this.loading=true;
  }

  afterLogin(response:any, status:boolean){
    this.error=!status;
    this.loading=false;
    if(status){
      var redirectTo = this.route.snapshot.queryParamMap.get("redirectTo"); 
      this.router.navigate([(redirectTo==undefined?'/home':redirectTo)])
    }else{
      this.message = response.error['message'];
    }
  }

}
