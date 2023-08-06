import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { SharedModule } from '../shared/shared.module';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';


@NgModule({
  declarations: [
    MachineListComponent,
    MachineDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MachineRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MachineModule { }
