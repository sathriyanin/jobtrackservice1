import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineListComponent } from './components/machine-list/machine-list.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MachineListComponent
  },
  {
    path: 'detail',
    component: MachineDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule { }
