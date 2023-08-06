import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { WorkorderFlowComponent } from './components/workorder-flow/workorder-flow.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    WorkorderFlowComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
