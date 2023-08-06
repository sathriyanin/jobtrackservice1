import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';
import { WorkOrderDetailComponent } from './components/work-order-detail/work-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderListComponent
  },
  {
    path: 'detail',
    component: WorkOrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
