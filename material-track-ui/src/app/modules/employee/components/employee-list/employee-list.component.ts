import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[] = [];

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((response: any) => {
      this.employeeList = response.value;
    })
  }

  deleteItem(employee: Employee) {
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.employeeList = this.employeeList.filter(item => item.id !== employee.id);
    });
  }
}
