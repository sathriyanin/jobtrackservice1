import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-track-ui';

  constructor(
    public readonly authService: AuthService,
    public readonly clientAuthService: ClientService
  ) {

  }

  doLogout() {
    this.authService.logOut();
  }
}
