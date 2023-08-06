import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClientLoginComponent,
    TrackingComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
