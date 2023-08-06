import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  orgList: any = []
  constructor(
    private readonly httpClient: HttpClient
  ) { 
    this.getOrgList().subscribe();
  }

  getOrgList() {
    return this.httpClient.get(`${HttpHelper.getOrgUrl}`).pipe(
      mergeMap((response: any) => {
        this.orgList = response.value;
        return of(response);
      })
    );
  }

}
