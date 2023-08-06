import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList: Customer[] = [];

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList() {
    this.customerService.getCustomerList().subscribe((response: any) => {
      this.customerList = response.value;
    })
  }
  deleteItem(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customerList = this.customerList.filter(item => item.id !== customer.id);
    });
  }
}
