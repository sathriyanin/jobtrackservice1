import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee: Employee = new Employee();
  employeeForm!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  orgList: any = [];

  userRoleList = [
    {
      role: 'APPADMIN',
      id: '0001'
    },
    {
      role: 'ADMIN',
      id: '0002'
    },
    {
      role: 'USER',
      id: '0003'
    },
  ]

  userRole = {
    USER: '0003'
  }

  editMode = false;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly orgService: OrganizationService,
    private readonly router: Router
  ) {
    const employee: any = this.router.getCurrentNavigation()?.extras?.state;
    if(employee) {
      this.editMode = true;
      this.employee = employee;
    }
   }

  ngOnInit(): void {
    this.getOrgList();
    this.createFormGroup();
  }

  createFormGroup() {
    this.employeeForm = this.formBuilder.group(this.employee);
  }

  onSubmit() {
    let observable = this.employeeService.createEmployee(this.employeeForm.value);
    if(this.editMode) {
      const obj = this.employeeForm.value as Employee;
      observable = this.employeeService.updateEmployee(obj);
    }
    observable.subscribe(response => {
      this.goToEmployee();
    });
  }

  getOrgList() {
    this.orgService.getOrgList().subscribe((response: any) => this.orgList = response.value);
  }

  goToEmployee() {
    this.router.navigate(['/home',{outlets: {"detail": ["employee"]}}]);
  }

}
