import { Component, OnInit } from '@angular/core';
import { WorkOrderAssignment, WorkOrderAssignmentStep, WorkOrderStepStatus } from 'src/app/models/work-order.model';
import { AppHelper } from 'src/app/modules/shared/util/app.helper';
import { AuthService } from 'src/app/services/auth.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-workorder-flow',
  templateUrl: './workorder-flow.component.html',
  styleUrls: ['./workorder-flow.component.scss']
})
export class WorkorderFlowComponent implements OnInit {
  emplyeeWorkOrderList: WorkOrderAssignment[] = [];
  view = 'CARD';
  currentWorkFlow!: WorkOrderAssignment | any; 
  constructor(private readonly workOrderService: WorkOrderService,
    private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignmentForEmployee();
  }
  getAssignmentForEmployee() {
    const userId = this.authService.getUser.id;
    this.workOrderService.getUsersAssignedList(userId).subscribe((response: any) => {
      this.emplyeeWorkOrderList = response.value;
    })
  }

  launchAssignment(assignment: WorkOrderAssignment) {
    this.currentWorkFlow = assignment;
    if(this.currentWorkFlow.status === 'OPEN') {
      this.currentWorkFlow.status = 'IN_PROGRESS';
      this.currentWorkFlow.startDate = new Date().toISOString ();
      this.workOrderService.updateWorkOrderAssignment(assignment).subscribe(() => {
        this.view = 'WORK_FLOW';
      });
    } else {
      this.view = 'WORK_FLOW';
    }
  }

  get stepStatusList() {
    return Object.assign({},WorkOrderStepStatus);
  }

  getStatusValue(status: any) {
    return AppHelper.getStatusValue(status);
  }

  saveStep(step: WorkOrderAssignmentStep) {
    this.workOrderService.updateWorkOrderAssignmentStep(this.currentWorkFlow.id,step).subscribe((response: any) => this.currentWorkFlow = response.value);
  }
}
