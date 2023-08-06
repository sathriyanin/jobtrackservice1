import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserRoleEnum } from '../models/employee.model';

@Directive({
  selector: '[appAcl]'
})
export class AclDirective {

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly authService: AuthService,
  ) { }

  @Input() set appAcl(roles: number[]) {
    if(roles.indexOf(this.authService.currentUserRole) !== -1) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
