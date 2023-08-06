import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      {
        path: 'employee',
        canActivate: [RoleGuard],
        loadChildren: () => import('../employee/employee.module').then(m => m.EmployeeModule),
        outlet: "detail"
      },
      {
        path: 'machine',
        canActivate: [RoleGuard],
        loadChildren: () => import('../machine/machine.module').then(m => m.MachineModule),
        outlet: "detail"
      },
      {
        path: 'customer',
        canActivate: [RoleGuard],
        loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule),
        outlet: "detail"
      },
      {
        path: 'workorder',
        canActivate: [RoleGuard],
        loadChildren: () => import('../work-order/work-order.module').then(m => m.WorkOrderModule),
        outlet: "detail"
      },
      {
        path: 'workorderassignment',
        canActivate: [RoleGuard],
        loadChildren: () => import('../work-order-assignment/work-order-assignment.module').then(m => m.WorkOrderAssignmentModule),
        outlet: "detail"
      },
      {
        path: '',
        redirectTo: 'employee',
        pathMatch:'full'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
