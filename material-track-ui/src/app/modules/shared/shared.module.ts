import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';

import { ReactiveFormsModule } from '@angular/forms';
import { AclDirective } from 'src/app/directives/acl.directive';
import { CompletionPercentagePipe } from 'src/app/pipes/completion-percentage.pipe';

const materialModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule,
  ReactiveFormsModule,
  MatChipsModule,
  MatGridListModule,
  MatExpansionModule,
  MatTableModule
]

@NgModule({
  declarations: [
    AclDirective,
    CompletionPercentagePipe

  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules,
    AclDirective,
    CompletionPercentagePipe
  ]
})
export class SharedModule { }
