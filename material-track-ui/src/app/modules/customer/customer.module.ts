import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
