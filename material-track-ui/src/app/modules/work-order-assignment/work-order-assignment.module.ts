import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderAssignmentRoutingModule } from './work-order-assignment-routing.module';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { SharedModule } from '../shared/shared.module';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';


@NgModule({
  declarations: [
    AssignmentListComponent,
    AssignmentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkOrderAssignmentRoutingModule
  ]
})
export class WorkOrderAssignmentModule { }
