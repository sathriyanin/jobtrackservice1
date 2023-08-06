import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { HttpClient } from '@angular/common/http';
import { Machine } from '../models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getMachineList(orgId: string) {
    return this.httpClient.get(`${HttpHelper.getMachineUrl}/list/${orgId}`);
  }
  createMachine(machine: Machine) {
    return this.httpClient.post(`${HttpHelper.getMachineUrl}`,machine);
  }
  updateMachine(machine: Machine) {
    return this.httpClient.put(`${HttpHelper.getMachineUrl}/${machine.id}`,machine);
  }
  deleteMachine(machine: Machine) {
    return this.httpClient.delete(`${HttpHelper.getMachineUrl}/${machine.id}`);
  }
}
