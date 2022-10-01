import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AuthService } from '../AuthService/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService, private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        if(req.url.endsWith('refresh-token'))
            return next.handle(req);
        for(let url of this.auth.url_no_token){
            var url_page= this.router.routerState.snapshot.url;
            if(url_page.endsWith(url) )
                return next.handle(req);
        }
        if(!this.auth.isAuthenticated()){
            return throwError("Unexpected behavior. No token for request");
        }
        var request = req.clone({
            setHeaders:{
                "Authorization": "Bearer "+this.auth.getUser().access_token
            }
        });
        return next.handle(request);
    }    
}