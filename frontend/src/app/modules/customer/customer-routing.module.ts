import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent},
  { path: 'list', component: CustomerListComponent },
  { path: 'add', component: AddCustomerComponent },
  { path: 'edit', component: EditCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
