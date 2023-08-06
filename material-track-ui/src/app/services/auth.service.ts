import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, mergeMap, of } from 'rxjs';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { IAuthUser } from '../modules/login/interface/user.interface';
import { Router } from '@angular/router';
import { UserRole, UserRoleEnum } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoaded = new Subject();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  get getToken() {
    return localStorage.getItem('token') || '';
  }

  set token(val: string) {
    if(val) {
      localStorage.setItem('token',val);
    }
  }

  set userId(val: any) {
    if(val) {
      localStorage.setItem('userId',val);
    }
  }

  get userId() {
    const id =  localStorage.getItem('userId') as any;
    return (id) ? id : null;
  }

  set setUser(val: any) {
    if(val) {
      localStorage.setItem('user',JSON.stringify(val));
      this.userLoaded.next(true);
    }
  }

  get getUser() {
    const user =  localStorage.getItem('user') as any;
    return (user) ? JSON.parse(user) : null;
  }

  get loggedIn() {
    return !!localStorage.getItem('token');
  }

  get currentUserRole() {
    const user = this.getUser;
    let role = 0;
    if(user) {
      const values = Object.values(user.roles)
      if(values.indexOf(UserRoleEnum.USER) !== -1) {
        role = UserRoleEnum.USER;
      }
      if(values.indexOf(UserRoleEnum.ADMIN) !== -1) {
        role = UserRoleEnum.ADMIN;
      }
      if(values.indexOf(UserRoleEnum.APPADMIN) !== -1) {
        role = UserRoleEnum.APPADMIN;
      } 

    };

    return role;
  }

  doLogin(authObject: IAuthUser) {
    const headerOption = {
      headers: new HttpHeaders({
        'authorization': `Basic ${btoa(`${authObject.username}:${authObject.password}`)}`
      })
    }
    return this.httpClient.post(HttpHelper.getLoginUrl,{},headerOption).pipe(
      mergeMap((response: any) => {
        this.token = response.value.accessToken;
        this.userId = response.value.userId;
        return of(response);
      })
    );
  }
}
