import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {
  status!: boolean;
  username!: any;
  role!: any;

  constructor(private auth: AuthService, private _snackbar : MatSnackBar) { }

  ngAfterContentChecked(): void {
    this.status = this.auth.isAuthenticated();
    if (this.status) {
      this.username = this.auth.getUser().username;
      this.role = this.auth.getRoles();
    }
  }

  ngOnInit(): void {
  }

  prova(){
    this.auth.prova(this.afterProva.bind(this));
  }

  afterProva(response:any, status:boolean){
    if(status){

    }else{
      this._snackbar.open('Error: '+response.error['message'], 'Undo');
    }
  }

}
