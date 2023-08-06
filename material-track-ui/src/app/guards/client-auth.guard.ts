import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private readonly clientService: ClientService,
    private readonly router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.clientService.loggedIn) {
        if(route.routeConfig?.path === 'track') {
          return true;
        } else {
          this.router.navigate(['client','track']);
          return false;
        }
      } else {
        if(route.routeConfig?.path === 'login') {
          return true;
        } else {
          this.router.navigate(['client','login']);
          return false;
        }
    }
  }
  
}
