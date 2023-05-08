import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
})
export class CustomerModule {}
