import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../modules/shared/util/http.helper';
import { mergeMap, of } from 'rxjs';
import { WorkOrderAssignment, WorkOrderAssignmentStep } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  activeWorkOrders: any[] = [];

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getWorkOrderList(userId: string) {
    return this.httpClient.get(`${HttpHelper.getWorkOrderUrl}/list/${userId}`);
  }
  getActiveWorkOrderList(userId: string) {
    return this.httpClient.get(`${HttpHelper.getWorkOrderUrl}/list/${userId}/?status=ACTIVE`).pipe(
      mergeMap((response: any) => {
        this.activeWorkOrders = response.value;
        return of(response);
      })
    );
  }
  createWorkOrder(workOrder: any) {
    return this.httpClient.post(`${HttpHelper.getWorkOrderUrl}`,workOrder);
  }
  updateWorkOrder(workOrder: any) {
    return this.httpClient.put(`${HttpHelper.getWorkOrderUrl}/${workOrder.id}`,workOrder);
  }
  deleteWorkOrder(workOrder: any) {
    return this.httpClient.delete(`${HttpHelper.getWorkOrderUrl}/${workOrder.id}`);
  }

  createWorkOrderAssignment(assignment: WorkOrderAssignment) {
    return this.httpClient.post(`${HttpHelper.getAssignmentUrl}`,assignment);
  }
  updateWorkOrderAssignment(assignment: WorkOrderAssignment) {
    return this.httpClient.put(`${HttpHelper.getAssignmentUrl}/${assignment.id}`,assignment);
  }
  getWorkOrderAssignmentList(userId: string) {
    return this.httpClient.get(`${HttpHelper.getAssignmentUrl}/${userId}`);
  }
  getUsersAssignedList(userId: string) {
    return this.httpClient.get(`${HttpHelper.getAssignmentUrl}/employee/${userId}`);
  }

  updateWorkOrderAssignmentStep(workOrderAssignmentId: any,step: WorkOrderAssignmentStep) {
    return this.httpClient.put(`${HttpHelper.getAssignmentUrl}/${workOrderAssignmentId}/step/${step.id}`,step);
  }

}
