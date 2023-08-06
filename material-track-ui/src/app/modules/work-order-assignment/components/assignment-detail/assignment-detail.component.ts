import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { WorkOrder, WorkOrderAssignment } from 'src/app/models/work-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  @Input() workOderAssignment: WorkOrderAssignment = new WorkOrderAssignment();
  workOderAssignmentForm!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  editMode = false;
  constructor(
    public workOrderService: WorkOrderService,
    public orgService: OrganizationService,
    public customerService: CustomerService,
    public employeeService: EmployeeService,
    public authService: AuthService,
    private readonly router: Router
  ) {
    const workOderAssignment: any = this.router.getCurrentNavigation()?.extras?.state;
    if(workOderAssignment) {
      this.editMode = true;
      this.workOderAssignment = workOderAssignment;
    }
  }

  ngOnInit(): void {
    if(this.workOrderService.activeWorkOrders.length === 0) {
      const userId = this.authService.getUser.id;
      this.workOrderService.getActiveWorkOrderList(userId).subscribe();
    }
    if(this.customerService.customerList.length === 0) {
      this.customerService.getCustomerList().subscribe();
    }

    if(this.employeeService.userRoleEmployeeList.length === 0) {
      this.employeeService.getEmployeeList({roles: 'USER'})
        .subscribe((response: any) => this.employeeService.userRoleEmployeeList = response.value);
    }
    this.createFormGroup();
  }
  createFormGroup() {
    const steps = this.workOderAssignment.steps.map((m: any) => {
      return this.formBuilder.group(m);
    });
    this.workOderAssignmentForm = this.formBuilder.group({
      ...this.workOderAssignment,
      steps: this.formBuilder.array(steps)
    });
  }

  onSubmit() {
    let observable = this.workOrderService.createWorkOrderAssignment(this.workOderAssignmentForm.getRawValue());
    if(this.editMode) {
      const obj = this.workOderAssignmentForm.getRawValue() as WorkOrderAssignment;
      observable = this.workOrderService.updateWorkOrderAssignment(obj);
    }
    observable.subscribe(response => {
      this.goToAssignment();
    });

  }

  goToAssignment() {
    this.router.navigate(['/home',{outlets: {"detail": ["workorderassignment"]}}]);
  }

  onWorkOrederIdChange(event: any) {
    const workOrder = this.workOrderService.activeWorkOrders.find(order => order.id === event.value);
    this.workOderAssignmentForm.controls['steps'] = this.formBuilder.array(workOrder.steps.map((m: any) => {
      m.assignedUserId = '';
      return this.formBuilder.group(m);
    }));
  }

  get steps() {
    return (this.workOderAssignmentForm) ? this.workOderAssignmentForm.controls["steps"] as FormArray : null;
  }
}
