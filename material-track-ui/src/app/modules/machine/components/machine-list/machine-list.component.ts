import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { AuthService } from 'src/app/services/auth.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit {
  machineList: Machine[] = [];
  constructor(
    private readonly machineService: MachineService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getMachineList()
  }

  getMachineList() {
    const orgId = this.authService.getUser.companyId;
    this.machineService.getMachineList(orgId).subscribe((response: any) => {
      this.machineList = response.value;
    });
  }

  deleteItem(machine: Machine) {
    this.machineService.deleteMachine(machine).subscribe(() => {
      this.machineList = this.machineList.filter(item => item.id !== machine.id);
    });
  }
}
