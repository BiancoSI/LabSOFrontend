import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private keycloak:KeycloakService) {
    window.sessionStorage.setItem('logged', 'true' );
    var role = keycloak.getUserRoles().find(value => value == 'admin');
    if ( role == undefined )
      role = 'dipendente';
    window.sessionStorage.setItem('role', role);
    window.sessionStorage.setItem('username', keycloak.getUsername());
   }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

}
