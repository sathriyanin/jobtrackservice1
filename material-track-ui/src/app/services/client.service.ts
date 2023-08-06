import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { IAuthUser } from '../modules/login/interface/user.interface';
import { HttpHelper } from '../modules/shared/util/http.helper';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) { }

  get getToken() {
    return localStorage.getItem('client_token') || '';
  }

  set token(val: string) {
    if(val) {
      localStorage.setItem('client_token',val);
    }
  }

  set clientId(val: any) {
    if(val) {
      localStorage.setItem('clientId',val);
    }
  }

  get clientId() {
    const id =  localStorage.getItem('clientId') as any;
    return (id) ? id : null;
  }

  get loggedIn() {
    return !!localStorage.getItem('client_token');
  }



  doLogin(authObject: IAuthUser) {
    const headerOption = {
      headers: new HttpHeaders({
        'authorization': `Basic ${btoa(`${authObject.username}:${authObject.password}`)}`
      })
    }
    return this.httpClient.post(HttpHelper.getTrackingLoginUrl,{},headerOption).pipe(
      mergeMap((response: any) => {
        this.token = response.value.accessToken;
        this.clientId = response.value.clientId;
        return of(response);
      })
    );
  }

  getAssignmentByClientId() {
    return this.httpClient.get(`${HttpHelper.getAssignmentUrl}/client/${this.clientId}`);
  }
}
