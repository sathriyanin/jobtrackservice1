import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderRoutingModule } from './work-order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkOrderDetailComponent } from './components/work-order-detail/work-order-detail.component';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WorkOrderDetailComponent,
    WorkOrderListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    WorkOrderRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkOrderModule { }
