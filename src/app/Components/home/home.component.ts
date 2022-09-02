import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {
  status!:boolean ;
  username!:any;
  role!:any;

  constructor() { }
  ngAfterContentChecked(): void {
    this.status = window.sessionStorage.getItem('logged')!=undefined;
    this.username = window.sessionStorage.getItem('username');
    this.role = window.sessionStorage.getItem('role');
  }

  ngOnInit(): void {
  }

}
