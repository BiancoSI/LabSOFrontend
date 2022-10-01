import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HOME, HOME_APP } from '../../Static/Static';
import { AuthService } from '../../Services/AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterContentChecked {

  logged!:boolean;
  constructor(private auth:AuthService, private _snackbar : MatSnackBar, private  router:Router) {}

  ngAfterContentChecked(): void {
    this.logged = (window.sessionStorage.getItem('client')!=undefined);
  }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout(this.afterLogout.bind(this));
  }

  afterLogout(response:any, status:boolean){
    if(status){
      this._snackbar.open(response['message'], '', {duration:1200}).afterDismissed().subscribe(
        {
          next: ()=>{
            this.router.navigate(['home']);
          }
        }
      );
    }else{
      this._snackbar.open(response.error['message'], '', {duration:1200});
    }
  }

}
