import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { Step, WorkOrder, WorkOrderStatus } from 'src/app/models/work-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { MachineService } from 'src/app/services/machine.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.scss']
})
export class WorkOrderDetailComponent implements OnInit {

  @Input() workOrder: WorkOrder = new WorkOrder();
  machineList: Machine[] = [];
  workOrderForm!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  editMode = false;
  constructor(
    private readonly workOrderService: WorkOrderService,
    public machineService: MachineService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    const workOrder: any = this.router.getCurrentNavigation()?.extras?.state;
    if(workOrder) {
      this.editMode = true;
      this.workOrder = workOrder;
    }
  }

  ngOnInit(): void {
    this.getMachineList();
  }
  getMachineList() {
    const orgId = this.authService.getUser.companyId;
    this.machineService.getMachineList(orgId).subscribe((response: any) => {
      this.machineList = response.value;
    });
  }
  createFormGroup() {
    this.workOrderForm = this.formBuilder.group(this.workOrder);
  }

  onSubmit() {
    let observable = this.workOrderService.createWorkOrder(this.workOrder);
    if(this.editMode) {
      const obj = this.workOrder as WorkOrder;
      observable = this.workOrderService.updateWorkOrder(obj);
    }
    observable.subscribe(response => {
      this.goToWorkOrder();
    });
  }

  goToWorkOrder() {
    this.router.navigate(['/home',{outlets: {"detail": ["workorder"]}}]);
  }

  addWorkOrderStep() {
    const step = new Step();
    this.workOrder.steps.push(step);
  }

  activateAndSubmit() {
    this.workOrder.status = WorkOrderStatus.ACTIVE;
    this.onSubmit();
  }

}
