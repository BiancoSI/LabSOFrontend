import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, filter, firstValueFrom, map, Observable, retry, retryWhen, switchMap, throwError } from "rxjs";
import { AuthService } from '../AuthService/auth.service';
import { Router } from '@angular/router';
import { User } from '../../Object/User';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status == 401) {
                 return this.auth.refreshToken().pipe(
                    switchMap((response:any)=>{
                        console.log(response);this.auth.autentica(response as User); 
                        var request = req.clone({
                            setHeaders:{'Authorization': 'Bearer '+this.auth.getUser().access_token}
                        })
                        return next.handle(request);
                    })
                 );
                 
            }
            if (err.status == 403) {
                this.router.navigate(['access-denied']);
            }
            console.log('error');
            
            return throwError(err)
        }))
    }

}