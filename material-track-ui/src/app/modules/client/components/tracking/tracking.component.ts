import { Component, OnInit } from '@angular/core';
import { WorkOrderAssignment, WorkOrderStatus, WorkOrderStepStatus } from 'src/app/models/work-order.model';
import { AppHelper } from 'src/app/modules/shared/util/app.helper';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  orderList = [];
  displayedColumns: string[] = ['displayId', 'name', 'status', 'startDate','endDate','completionStatus'];
  constructor(
    private readonly clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getAssignmentByClientId();
  }

  getAssignmentByClientId() {
    this.clientService.getAssignmentByClientId().subscribe((response: any) => this.orderList = response.value)
  }

  getCompletionStatus(workOrder: WorkOrderAssignment) {
    let completionCount = 0
    if(workOrder.status === WorkOrderStatus.OPEN) {
      return completionCount;
    }
    const totalStep = workOrder.steps.length;
    workOrder.steps.forEach(item => {
      if(item.status === WorkOrderStepStatus.COMPLETE) {
        completionCount++;
      }
      if(item.id === workOrder.currentStepId) {
        return;
      }
    });
    const percentage = Math.abs((completionCount/totalStep)*100);
    return percentage;
  }

  get appHelper() {
    return AppHelper;
  }

  get workOrderStatus() {
    return WorkOrderStatus;
  }

}
