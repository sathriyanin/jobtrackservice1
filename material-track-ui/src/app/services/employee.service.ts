import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  userRoleEmployeeList: any[] = []

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getEmployeeList(param: any ={}) {
    return this.httpClient.get(`${HttpHelper.getEmployeeUrl}`,param);
  }
  
  createEmployee(employee: Employee) {
    return this.httpClient.post(`${HttpHelper.getEmployeeUrl}`,employee);
  }
  updateEmployee(employee: Employee) {
    return this.httpClient.put(`${HttpHelper.getEmployeeUrl}/${employee.id}`,employee);
  }
  deleteEmployee(employee: Employee) {
    return this.httpClient.delete(`${HttpHelper.getEmployeeUrl}/${employee.id}`);
  }
}
