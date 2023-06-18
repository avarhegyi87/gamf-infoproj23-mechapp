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
  vehicleControl = new FormControl<string | Vehicle>('');
  serviceList: String[] = [];
  materialList: String[] = [];
  customerSelected: boolean = false;
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

    this._addQuotationRequest = {
      id: null,
      customerId: null,
      vehicleId: null,
      createdBy: null,
      updatedBy: null,
      description: null,
      state: null,
      finalizeDate: null,
    };



  }

  get f() {
    return this.addQuotationForm.controls;
  }

  private _filterCustomer(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterVehicle(searchTerm: string): Vehicle[] {
    const filterValue = searchTerm.toLowerCase();
    return this.vehicles.filter(option => option.licencePlate.toLowerCase().includes(filterValue));
  }

  displayCust(customer: Customer): string {
    return customer?.name ? customer.name : '';
  }

  onCustomerOptionSelected(customer: Customer) {
    this._addQuotationRequest.customerId = customer.id;
    this.vehicleService.getVehiclesByCustomer(customer.id).subscribe(vehicles => {
      this.vehicles = vehicles;
      this.customerSelected = true;
    });
  }

  displayVeh(vehicle: Vehicle): string {
    return vehicle.licencePlate;
  }

  onVehicleOptionSelected(vehicle: Vehicle) {
    this._addQuotationRequest.vehicleId = vehicle.id;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  ngOnInit(): void {
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.name;
        return customerName ? this._filterCustomer(customerName as string) : this.customers.slice();
      }),
    );

    this.filteredVehicles = this.vehicleControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const licencePlate = typeof value === 'string' ? value : value?.licencePlate;
        return licencePlate ? this._filterVehicle(licencePlate as string) : this.vehicles.slice();
      }),
    );
    this.addQuotationForm = this.formBuilder.group({
      customer: [null, this._addQuotationRequest.customerId && this._addQuotationRequest.customerId > 0],

      vehicle: [null, this._addQuotationRequest.vehicleId && this._addQuotationRequest.vehicleId > 0],

      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
        ]),
      ],
    });
  }

  onSubmit() {
    /**TODO: onSubmit for AddQuotation */
  }
}
