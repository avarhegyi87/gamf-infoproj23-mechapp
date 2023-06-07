import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { FuelTypeToLabelMapping, FuelTypeEnum } from '../../models/fuel-types';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleApi } from '../../models/vehicleApi.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { DeletionModalComponent } from 'src/app/shared/components/deletion-modal/deletion-modal.component';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
  editVehicleForm!: FormGroup;
  customers: Customer[] = [];
  vehicleApi!: VehicleApi;
  vehicle!: Vehicle;
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');

  fuelTypeMapping = FuelTypeToLabelMapping;
  fuelTypes = Object.values(FuelTypeEnum);
  error = '';
  submitted = false;
  vehicleDetails: Vehicle = {
    id: 0,
    vin: '',
    licencePlate: '',
    customer: this.customers[0],
    productionYear: 0,
    mileage: 0,
    carBrand: '',
    carMake: '',
    displacement: 0,
    fuelType: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.editVehicleForm = this.formBuilder.group({
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
      customer: [null, this.vehicleDetails.customer && this.vehicleDetails.customer.id > 0],
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

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.vehicleService.getVehicle(parseInt(id)).subscribe({
            next: vehicleApi => {
              for(const element of this.customers){
                if(element.id == vehicleApi.customerId){
                  this.vehicle = {
                    id: vehicleApi.id,
                    carBrand: vehicleApi.carBrand,
                    carMake: vehicleApi.carMake,
                    vin: vehicleApi.vin,
                    displacement: vehicleApi.displacement,
                    productionYear: vehicleApi.productionYear,
                    licencePlate: vehicleApi.licencePlate,
                    fuelType: vehicleApi.fuelType,
                    mileage: vehicleApi.mileage,
                    customer: element,
                  }
                }
              }
              this.vehicleDetails = this.vehicle;
            },
          });
        }
      },
    });

    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.name;
        return customerName ? this._filter(customerName as string) : this.customers.slice();
      }),
    );
  }

  displayFn(customer: Customer): string {
    return customer?.name ? customer.name : '';
  }

  private _filter(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onCustomerOptionSelected(customer: Customer) {
    this.vehicleDetails.customer = customer;
  }

  onFuelOptionSelected(option: string) {
    this.vehicleDetails.fuelType = option;
  }

  changeTextToUppercase(field: string) {
    const obj: any = {};
    obj[field] = this.f[field].value.toUpperCase();
    this.editVehicleForm.patchValue(obj);
  }

  get f() {
    return this.editVehicleForm.controls;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  onSubmit() {
    const submitButton = document.activeElement as HTMLButtonElement;
    if (submitButton.classList.contains('submit-button')) this.onUpdate();
  }

  onUpdate() {
    this.submitted = true;
    if (this.editVehicleForm.invalid) return;

    this.vehicleApi = {
      id: this.vehicleDetails.id,
      carBrand: this.vehicleDetails.carBrand,
      carMake: this.vehicleDetails.carMake,
      vin: this.vehicleDetails.vin,
      displacement: this.vehicleDetails.displacement,
      productionYear: this.vehicleDetails.productionYear,
      licencePlate: this.vehicleDetails.licencePlate,
      fuelType: this.vehicleDetails.fuelType,
      mileage: this.vehicleDetails.mileage,
      customerId: this.vehicleDetails.customer.id,
    };
    this.vehicleService
      .updateVehicle(this.vehicleDetails.id, this.vehicleApi)
      .subscribe({
        next: vehicle => {
          this.snackBar.open(
            `${this.vehicleDetails.id} - ${this.vehicleDetails.licencePlate} adatai sikeresen módosítva.`,
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

  openDeletionModal() {
    const dialogRef = this.dialog.open(DeletionModalComponent, {
      data: { id: this.vehicleDetails.id, licencePlate: this.vehicleDetails.licencePlate },
    });

    dialogRef.componentInstance.deleteClicked.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) this.onDelete();
    })
  }

  onDelete() {
    this.vehicleService.deleteVehicle(this.vehicleDetails.id).subscribe({
      next: response => {
        this.snackBar.open(
          `${this.vehicleDetails.id} - ${this.vehicleDetails.licencePlate} sikeresen törölve.`, 'OK', {
            duration: 3000, panelClass: ['mat-toolbar', 'mat-primary'],
          },
        );
        (async () => {
          await this.router.navigate(['vehicle/list']);
        })();
      },
      error: error => {
        this.error = error;
        this.snackBar.open(this.error, 'Bezár', {
          duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'],
        })
      },
    });
  }
}
