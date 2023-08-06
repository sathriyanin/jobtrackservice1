import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.loggedIn) {
        if(route.routeConfig?.path === 'auth') {
          this.router.navigate(['home']);
          return false;
        } else {
          return true;
        }
      } else {
        if(route.routeConfig?.path === 'auth') {
          return true;
        } else {
          this.router.navigate(['auth']);
          return false;
        }
      }
    }
  
}
