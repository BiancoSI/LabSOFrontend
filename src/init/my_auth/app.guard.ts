import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, TitleStrategy, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from '../../app/Services/AuthService/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router:Router, private auth:AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.isAccessAllowed(route, state);
    }

    async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.auth.isAuthenticated()){
            this.router.navigate(['login'], {queryParams:{redirectTo:state.url}})
        }
        var client_roles:string[] = this.auth.getRoles();
        console.log(client_roles);
        const roles = route.data['roles'];
        if(!(roles instanceof Array) || roles.length == 0)
            return true; 
        if( (roles.every((role:string)=>{return client_roles.includes(role)})))
            return true;
        return this.router.navigate(['access-denied']);
    }

}
