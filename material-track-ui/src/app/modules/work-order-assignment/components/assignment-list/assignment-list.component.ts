import { Component, OnInit } from '@angular/core';
import { WorkOrderAssignment } from 'src/app/models/work-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {


  assignmentList: WorkOrderAssignment[] = [];

  constructor(
    public workOrderService: WorkOrderService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAsssignmentList();
  }

  getAsssignmentList() {
    const userId = this.authService.getUser.id;
    this.workOrderService.getWorkOrderAssignmentList(userId).subscribe((response: any) => {
      this.assignmentList = response.value;
    })
  }

}
