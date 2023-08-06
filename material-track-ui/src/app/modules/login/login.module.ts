import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
