import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { Customer } from '../models/customer.model';
import { mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: any[] = []

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getCustomerList() {
    return this.httpClient.get(`${HttpHelper.getCustomerUrl}`).pipe(
      mergeMap((response: any) => {
        this.customerList = response.value;
        return of(response);
      })
    );
  }
  createCustomer(customer: Customer) {
    return this.httpClient.post(`${HttpHelper.getCustomerUrl}`,customer);
  }
  updateCustomer(customer: Customer) {
    return this.httpClient.put(`${HttpHelper.getCustomerUrl}/${customer.id}`,customer);
  }
  deleteCustomer(customer: Customer) {
    return this.httpClient.delete(`${HttpHelper.getCustomerUrl}/${customer.id}`);
  }
}
