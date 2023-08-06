import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private readonly clientAuthService: ClientService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const payload = this.form.value;
    this.clientAuthService.doLogin(payload).subscribe(response => {
      this.router.navigate(['client','track']);
    });
  }

}
