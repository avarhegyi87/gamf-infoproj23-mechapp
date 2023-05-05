import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';


@NgModule({
  declarations: [
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
  ],
})
export class CustomerModule { }
