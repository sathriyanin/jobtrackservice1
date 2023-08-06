import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/services/machine.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit {
  @Input() machine: Machine = new Machine();
  machineForm!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  editMode = false;
  constructor(
    private readonly machineService: MachineService,
    public orgService: OrganizationService,
    private readonly router: Router
  ) {
    const machine: any = this.router.getCurrentNavigation()?.extras?.state;
    if(machine) {
      this.editMode = true;
      this.machine = machine;
    }
  }

  ngOnInit(): void {
    this.createFormGroup();
  }
  createFormGroup() {
    this.machineForm = this.formBuilder.group(this.machine);
  }

  onSubmit() {
    let observable = this.machineService.createMachine(this.machineForm.value);
    if(this.editMode) {
      const obj = this.machineForm.value as Machine;
      observable = this.machineService.updateMachine(obj);
    }
    observable.subscribe(response => {
      this.goToMachine();
    });
  }

  goToMachine() {
    this.router.navigate(['/home',{outlets: {"detail": ["machine"]}}]);
  }
}
