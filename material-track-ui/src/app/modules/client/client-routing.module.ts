import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAuthGuard } from 'src/app/guards/client-auth.guard';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { TrackingComponent } from './components/tracking/tracking.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path:'login',canActivate: [ClientAuthGuard], component: ClientLoginComponent},
  {path:'track',canActivate: [ClientAuthGuard], component: TrackingComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
