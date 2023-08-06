import { Component, OnInit } from '@angular/core';
import { WorkOrder } from 'src/app/models/work-order.model';
import { AuthService } from 'src/app/services/auth.service';
import { WorkOrderService } from 'src/app/services/work-order.service';

@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.scss']
})
export class WorkOrderListComponent implements OnInit {

  workOrderList: WorkOrder[] = [];

  constructor(
    private readonly workOrderService: WorkOrderService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getWorkorderList();
  }

  deleteItem(workOrder: WorkOrder) {
    this.workOrderService.deleteWorkOrder(workOrder).subscribe(() => {
      this.workOrderList = this.workOrderList.filter(item => item.id !== workOrder.id);
    });
  }

  getWorkorderList() {
    const userId = this.authService.getUser.id;
    this.workOrderService.getWorkOrderList(userId).subscribe((response: any) => {
      this.workOrderList = response.value;
    })
  }

}
