import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { mergeMap, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) { }

  getUserById(id: string) {
    return this.httpClient.get(`${HttpHelper.getUserUrl}/${id}`).pipe(
      mergeMap((response: any) => {
        this.authService.setUser = response.value;
        return of(response);
      })
    );
  }
}
