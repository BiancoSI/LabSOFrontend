import { Injectable } from '@angular/core';
import { RestManager } from '../RestService/RestManager';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { ADDRESS_SERVER } from 'src/app/Static/Static';
import { User, Client } from '../../Object/User';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = ADDRESS_SERVER;
  url_no_token: string[] = ['/home', 'login', 'registrazione'];

  http: HttpClient;
  constructor(http: HttpClient, private router: Router) {
    this.http = http;
  }

  login(username: string, password: string, callback: any) {
    return this.http.post(ADDRESS_SERVER + "/account/login", { username: username, password: password }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.autentica(response as User);
        callback(response, true);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        callback(error, false);
      }
    });
  }

  logout(callback: any, redirectTo?: string) {
    if (window.sessionStorage.getItem("client") == undefined) return;
    var client: User = this.getUser();
    var access_token = client.access_token;
    var refresh_token = client.refresh_token;
    return this.http.post(ADDRESS_SERVER + "/account/logout", { access_token: access_token, refresh_token: refresh_token }).subscribe(
      {
        next: (response: any) => {
          this.dimentica();
          console.log(response);
          callback(response, true);
        },
        error: (response: HttpErrorResponse) => {
          console.log(response);
          callback(response, false);
        }
      }
    );
  }

  refreshToken() {
    return this.http.post(
      ADDRESS_SERVER + "/account/refresh-token",
      { access_token: "", refresh_token: this.getUser().refresh_token }
    );
  }

  isAuthenticated(): boolean {
    return (window.sessionStorage.getItem("client") != undefined);
  }

  autentica(user: User) {
    window.sessionStorage.setItem("client", JSON.stringify(user));
  }

  dimentica() {
    window.sessionStorage.removeItem("client");
  }

  getUser(): User {
    return JSON.parse(window.sessionStorage.getItem("client") as string);
  }
  getRoles(): string[] {
    var ret: string[] = [];
    var user: any = window.sessionStorage.getItem("client");
    return ret = (user != undefined) ? (JSON.parse(user) as User).roles : [];
  }

  registra(user:Client, callback: any) {
    this.http.post(ADDRESS_SERVER + "/account/register/new-user", user).subscribe({
      next: (response: any) => {
        callback(response, true);
      },
      error: (response: HttpErrorResponse) => {
        callback(response, false);
      }
    })
  }
}
