import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkOrderAssignment } from 'src/app/models/work-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;

  menuList = [
    {
      name: "Employees",
      acl: [],
      id: 'EMPLOYEES',
      path: 'employee'
    },
    {
      name: "Machine",
      acl: [],
      id: 'MACHINES',
      path: 'machine'
    },
    {
      name: "Customers",
      acl: [],
      id: 'CUSTOMERS',
      path: 'customer'
    },
    {
      name: "Work order",
      acl: [],
      id: 'WORK_ORDER',
      path: 'workorder'
    },
    {
      name: "Work order Assignment",
      acl: [],
      id: 'WORK_ORDER_ASSIGNMENT',
      path: 'workorderassignment'
    },
  ]
  selectedMenu = this.menuList[0].id;
  
  constructor(
    private readonly userService: UserService,
    private readonly workOrderService: WorkOrderService,
    public authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const userId = this.authService.userId;
    if(userId) {
      this.userService.getUserById(userId).subscribe(() => {
        this.user = this.authService.getUser;
      });
    }
  }

  menuSelection(event: any) {
    this.router.navigate(['/home',{outlets: {"detail": ["employee"]}}]);
  }



}
