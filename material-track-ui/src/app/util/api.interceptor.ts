import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { ClientService } from '../services/client.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  requestCount = 0;
  constructor(
    private authService: AuthService,
    private readonly router: Router,
    private readonly sharedService: SharedService,
    private readonly clientService: ClientService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.sharedService.isLoading = true;
    this.requestCount++;
    let tokenzedReq = request;
    if((this.authService.loggedIn || this.clientService.loggedIn) && !request.url.match('login')) {
      tokenzedReq = request.clone({
        setHeaders:
        {
          Authorization: `Bearer ${this.authService.getToken || this.clientService.getToken}`
        }
      });
    } 
    return next.handle(tokenzedReq).pipe(
      catchError((err: any) => {
        if(err.status === 401) {
          this.authService.logOut();
        }
        return throwError(err);
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.sharedService.isLoading = false;
          this.sharedService.isBackground = false;
        }
      })
    );
  }
}
