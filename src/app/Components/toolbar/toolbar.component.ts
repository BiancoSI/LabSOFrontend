import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HOME, HOME_APP } from '../../Static/Static';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterContentChecked {
  logged!:boolean;
  constructor(private keycloak:KeycloakService) {}
  ngAfterContentChecked(): void {
    this.logged = (window.sessionStorage.getItem('logged')!=undefined);
  }

  ngOnInit(): void {
  }

  logout(){
    window.sessionStorage.removeItem('logged');
    this.keycloak.logout(HOME_APP+HOME);
  }

}
