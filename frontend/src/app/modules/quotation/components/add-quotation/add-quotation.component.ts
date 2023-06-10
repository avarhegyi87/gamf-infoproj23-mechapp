import { Component, OnInit } from '@angular/core';

import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss'],
})
export class AddQuotationComponent implements OnInit {
  addQuotationForm!: FormGroup;
  customers: Customer[] = [];
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');
  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  VehicleControl = new FormControl<string | Vehicle>('');
  serviceList: String[] = [];
  materialList: String[] = [];
  error = '';
  submitted = false;
  private _addQuotationRequest: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
  ) {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });

    this._addQuotationRequest = {
      id: 0,
      customer: 0,
      vehicle: 0,
      serviceList: this.serviceList,
      materialList: this.materialList,
      description: '',
      finalizeDate: new Date(),
    };
  }

  ngOnInit(): void {
    this.addQuotationForm = this.formBuilder.group({});
  }

  onSubmit() {
    /**TODO: onSubmit for AddQuotation */
  }
}
