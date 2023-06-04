import { Customer } from './../../../customer/models/customer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { FuelTypeEnum, FuelTypeToLabelMapping } from '../../models/fuel-types';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  addVehicleForm!: FormGroup;
  customers: Customer[] = [];
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');
  fuelTypeMapping = FuelTypeToLabelMapping;
  fuelTypes = Object.values(FuelTypeEnum);
  error = '';
  submitted = false;
  private _addVehicleRequest: any;
  

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

    this._addVehicleRequest = {
      id: 0,
      vin: '',
      licencePlate: '',
      customerId: 0,
      productionYear: 0,
      mileage: 0,
      carBrand: '',
      carMake: '',
      displacement: 0,
      fuelType: '',
    };
  }

  ngOnInit(): void {
    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.name;
        return customerName ? this._filter(customerName as string) : this.customers.slice();
      }),
    );

    this.addVehicleForm = this.formBuilder.group({
      vin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9A-Z]{17}$/),
        ]),
      ],
      licencePlate: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9A-Z]{6,7}$/),
        ]),
      ],
      customer: [null, this._addVehicleRequest.customerId && this._addVehicleRequest.customerId > 0],
      productionYear: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1900),
          Validators.max(2023),
        ]),
      ],
      mileage: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      carBrand: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      ],
      carMake: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      ],
      displacement: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      fuelType: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],
    });
  }

  displayFn(customer: Customer): string {
    return customer?.name ? customer.name : '';
  }

  private _filter(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onCustomerOptionSelected(customer: Customer) {
    this._addVehicleRequest.customerId = customer.id;
  }

  onFuelOptionSelected(option: string) {
    this._addVehicleRequest.fuelType = option;
  }

  get f() {
    return this.addVehicleForm.controls;
  }

  changeTextToUppercase(field: string) {
    const obj: any = {};
    obj[field] = this.f[field].value.toUpperCase();
    this.addVehicleForm.patchValue(obj);
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.addVehicleForm.invalid) return;

    this._addVehicleRequest.vin = this.addVehicleForm.get('vin')?.value;
    this._addVehicleRequest.licencePlate =
      this.addVehicleForm.get('licencePlate')?.value;
    this._addVehicleRequest.productionYear =
      this.addVehicleForm.get('productionYear')?.value;
    this._addVehicleRequest.mileage = this.addVehicleForm.get('mileage')?.value;
    this._addVehicleRequest.carBrand =
      this.addVehicleForm.get('carBrand')?.value;
    this._addVehicleRequest.carMake = this.addVehicleForm.get('carMake')?.value;
    this._addVehicleRequest.displacement =
      this.addVehicleForm.get('displacement')?.value;
    this._addVehicleRequest.fuelType =
      this.addVehicleForm.get('fuelType')?.value;
      
    console.log(this._addVehicleRequest);

    this.vehicleService.addVehicle(this._addVehicleRequest).subscribe({
      next: vehicle => {
        this.snackBar.open(
          `Jármű sikeresen hozzáadva, azonosítója: ${vehicle.id}`,
          'OK',
          {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          },
        );
        (async () => {
          await this.router.navigate(['vehicle/list']);
        })();
      },
      error: error => {
        this.error = error;
        this.snackBar.open(this.error, 'Bezár', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      },
    });
  }
}
