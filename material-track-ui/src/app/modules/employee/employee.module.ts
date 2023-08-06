import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmployeeModule { }
