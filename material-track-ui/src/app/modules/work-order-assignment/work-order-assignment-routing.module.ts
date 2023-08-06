import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentListComponent
  },
  {
    path: 'detail',
    component: AssignmentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderAssignmentRoutingModule { }
