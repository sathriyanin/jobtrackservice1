import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer = new Customer();
  customerForm!: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  orgList: any = [];

  editMode = false;

  constructor(
    private readonly customerService: CustomerService,
    public readonly orgService: OrganizationService,
    private readonly router: Router
  ) {
    const customer: any = this.router.getCurrentNavigation()?.extras?.state;
    if(customer) {
      this.editMode = true;
      this.customer = customer;
    }
   }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.customerForm = this.formBuilder.group(this.customer);
  }

  onSubmit() {
    let observable = this.customerService.createCustomer(this.customerForm.value);
    if(this.editMode) {
      const obj = this.customerForm.value as Customer;
      observable = this.customerService.updateCustomer(obj);
    }
    observable.subscribe(() => {
      this.goToCustomer();
    });
  }

  goToCustomer() {
    this.router.navigate(['/home',{outlets: {"detail": ["customer"]}}]);
  }

}
