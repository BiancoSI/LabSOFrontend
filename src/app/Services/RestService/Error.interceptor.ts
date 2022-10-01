import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from '../AuthService/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService, private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err:HttpErrorResponse) => {
            if (err.status == 401) {
                 this.router.navigate(['refresh-token'], {queryParams: {redirectTo:this.router.routerState.snapshot.url}});
            }
            if(err.status == 403){
                this.router.navigate(['access-denied']);
            }
            return throwError(err)
        }))
    }
    
}