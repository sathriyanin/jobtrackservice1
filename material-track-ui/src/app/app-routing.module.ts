import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.guard';

const routes: Routes = [
  {path:'client',loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)},
  {path:'auth', canActivate: [AuthGuardService],loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path:'home', canActivate: [AuthGuardService],loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},      
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
