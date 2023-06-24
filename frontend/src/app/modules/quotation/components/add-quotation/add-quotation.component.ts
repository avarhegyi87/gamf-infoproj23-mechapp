import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { Job } from 'src/app/modules/job/models/job.model';
import { Material } from 'src/app/modules/material/models/material.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { JobService } from 'src/app/modules/job/services/job.service';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { QuotationJobList } from '../../models/quotation-job-list.model';
import { DynamicTableComponent } from 'src/app/shared/components/dynamic-table/dynamic-table.component';
import { VAT_HUN } from 'src/app/shared/constants/constants';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { User } from 'src/app/modules/users/models/user.model';
import { QuotationService } from '../../services/quotation.service';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss'],
})
export class AddQuotationComponent implements OnInit {
  // Quotation request and main form, and the types of data stored in it
  private _addQuotationRequest: any;
  private _addJobRequest: any;
  addQuotationForm!: FormGroup;
  customers: Customer[] = [];
  jobs: Job[] = [];

  // accessor for the dynamic tables storing the added materials and services
  @ViewChildren(DynamicTableComponent)
  dynamicTables!: QueryList<DynamicTableComponent>;
  private _allProductsAndServices: QuotationJobList[] = [];

  // Form for adding products, and data passed on to its dynamic table
  partsTableForm!: FormGroup;
  partList: QuotationJobList[] = [];
  partQuantity!: number;

  // Form for adding services, and data passed on to its dynamic table
  servicesTableForm!: FormGroup;
  serviceList: QuotationJobList[] = [];
  jobQuantity!: number;

  // properties for filtering Materials of type PRODUCT in the auto-complete field of partsTableForm
  parts: Material[] = [];
  addedPart!: Material;
  partControl = new FormControl<string | Material>('');
  filteredParts!: Observable<Material[]>;

  // properties for filtering Materials of type SERVICE in the auto-complete field of servicesTableForm
  services: Material[] = [];
  addedService!: Material;
  serviceControl = new FormControl<string | Material>('');
  filteredServices!: Observable<Material[]>;

  // properties for filtering Customers in the auto-complete field of addQuotationForm
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');
  customerSelected = false;

  // properties for filtering Vehicles in the auto-complete field of addQuotationForm
  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  vehicleControl = new FormControl<string | Vehicle>('');

  // other properties
  error = '';
  submitted = false;
  currentUser: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private jobService: JobService,
    private materialService: MaterialService,
    private quotationService: QuotationService,
    private snackBar: MatSnackBar,
  ) {
    authService.getCurrentUser.subscribe(user => (this.currentUser = user));
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.materialService.getMaterials().subscribe(materials => {
      this.parts = materials;
    });

    this.materialService.getWorks().subscribe(works => {
      this.services = works;
    });

    this._addQuotationRequest = {
      id: 0,
      vehicleId: 0,
      customerId: 0,
      createdBy: 0,
      updatedBy: 0,
      description: '',
      //parts: null,
      state: -1,
      finalizeDate: undefined,
    };

    this._addJobRequest = {
      id: 0,
      quotationId: 0,
      materialId: '',
      quantity: 0,
    }
  }

  ngOnInit(): void {
    this.addQuotationForm = this.formBuilder.group(
      {
        customer: [
          null,
          this._addQuotationRequest.customerId &&
            this._addQuotationRequest.customerId > 0,
        ],
        vehicle: [
          null,
          this._addQuotationRequest.vehicleId &&
            this._addQuotationRequest.vehicleId > 0,
        ],
        description: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255),
          ]),
        ],
        allProductsAndServices: [[]],
      },
      { validator: this.arrayNotEmptyValidator() },
    );

    this.partsTableForm = this.formBuilder.group({
      part: [null, Validators.compose([Validators.required])],
      partQuantity: [
        '',
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
    });

    this.servicesTableForm = this.formBuilder.group({
      job: [null, Validators.compose([Validators.required])],
      serviceQuantity: [
        '',
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
    });

    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.name;
        return customerName
          ? this._filterCustomer(customerName as string)
          : this.customers.slice();
      }),
    );

    this.filteredVehicles = this.vehicleControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const licencePlate =
          typeof value === 'string' ? value : value?.licencePlate;
        return licencePlate
          ? this._filterVehicle(licencePlate as string)
          : this.vehicles.slice();
      }),
    );

    this.filteredParts = this.partControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const description =
          typeof value === 'string' ? value : value?.description;
        return description
          ? this._filterPart(description as string)
          : this.parts.slice();
      }),
    );

    this.filteredServices = this.serviceControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const description =
          typeof value === 'string' ? value : value?.description;
        return description
          ? this._filterJobTypes(description as string)
          : this.services.slice();
      }),
    );
  }

  validateForm() {
    this.addQuotationForm.updateValueAndValidity();
  }

  get f() {
    return this.addQuotationForm.controls;
  }

  get allProductsAndServices(): QuotationJobList[] {
    let data: QuotationJobList[] = [];
    if (this.dynamicTables) {
      this.dynamicTables.forEach((tbl: DynamicTableComponent) => {
        data = [...tbl.data];
      });
    }
    this._allProductsAndServices = data;
    return this._allProductsAndServices;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  isInvalidPart(field: string): boolean {
    return (
      this.partsTableForm.controls[field].invalid &&
      (this.partsTableForm.controls[field].touched ||
        this.partsTableForm.controls[field].dirty)
    );
  }

  isInvalidService(field: string): boolean {
    return (
      this.servicesTableForm.controls[field].invalid &&
      (this.servicesTableForm.controls[field].touched ||
        this.servicesTableForm.controls[field].dirty)
    );
  }

  arrayNotEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        Array.isArray(this.allProductsAndServices) &&
        this.allProductsAndServices.length === 0
      )
        return { arrayEmpty: true };

      return null;
    };
  }

  private _filterCustomer(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option =>
      option.name.toLowerCase().includes(filterValue),
    );
  }

  private _filterVehicle(searchTerm: string): Vehicle[] {
    const filterValue = searchTerm.toLowerCase();
    return this.vehicles.filter(option =>
      option.licencePlate.toLowerCase().includes(filterValue),
    );
  }

  private _filterPart(searchTerm: string): Material[] {
    const filterValue = searchTerm.toLowerCase();
    return this.parts.filter(option =>
      option.description.toLowerCase().includes(filterValue),
    );
  }

  private _filterJobTypes(searchTerm: string): Material[] {
    const filterValue = searchTerm.toLowerCase();
    return this.services.filter(option =>
      option.description.toLowerCase().includes(filterValue),
    );
  }

  displayCust(customer: Customer): string {
    return customer?.name ? customer.name : '';
  }

  onCustomerOptionSelected(customer: Customer) {
    this._addQuotationRequest.customerId = customer.id;
    this.vehicleService
      .getVehiclesByCustomer(customer.id)
      .subscribe(vehicles => {
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

  displayParts(part: Material): string {
    return part.description ? part.description : '';
  }

  onPartOptionSelected(part: Material) {
    this.addedPart = part;
  }

  displayServices(part: Material): string {
    return part.description ? part.description : '';
  }

  onJobOptionSelected(mat: Material) {
    this.addedService = mat;
  }

  getAllJobs() {
    this.dynamicTables.forEach((tbl: DynamicTableComponent) => {
      const data: QuotationJobList[] = tbl.data;
    });
  }

  totalNet(): number {
    let sum = 0;
    if (this.dynamicTables) {
      this.dynamicTables.forEach((tbl: DynamicTableComponent) => {
        const data: QuotationJobList[] = tbl.data;
        sum += data.reduce((sum, item) => sum + item.subTotal, 0);
      });
    }
    this.validateForm();
    return sum;
  }

  totalGross(): number {
    return this.totalNet() * (1 + VAT_HUN);
  }

  addNewPart() {
    const newPart: QuotationJobList = {
      materialNumber: this.addedPart.materialNumber,
      description: this.addedPart.description,
      quantity: this.partsTableForm.get('partQuantity')?.value,
      unitPrice: this.addedPart.netPrice,
      subTotal:
        this.addedPart.netPrice *
        this.partsTableForm.get('partQuantity')?.value,
    };
    const existingPart: QuotationJobList | undefined = this.partList.find(
      x => x.materialNumber === newPart.materialNumber,
    );
    if (existingPart) {
      existingPart.quantity += newPart.quantity;
      existingPart.subTotal = existingPart.unitPrice * existingPart.quantity;
    } else {
      this.partList.push(newPart);
    }
    this.partsTableForm.reset();
  }

  addNewService() {
    const newService: QuotationJobList = {
      materialNumber: this.addedService.materialNumber,
      description: this.addedService.description,
      quantity: this.servicesTableForm.get('serviceQuantity')?.value,
      unitPrice: this.addedService.netPrice,
      subTotal:
        this.addedService.netPrice *
        this.servicesTableForm.get('serviceQuantity')?.value,
    };
    const existingService: QuotationJobList | undefined = this.serviceList.find(
      x => x.materialNumber === newService.materialNumber,
    );
    if (existingService) {
      existingService.quantity += newService.quantity;
      existingService.subTotal =
        existingService.unitPrice * existingService.quantity;
    } else {
      this.serviceList.push(newService);
    }
    this.servicesTableForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addQuotationForm.invalid) return;

    this._addQuotationRequest.createdBy = this.currentUser?.$id;
    this._addQuotationRequest.description = this.addQuotationForm.get('description')?.value;
    this._addQuotationRequest.state = 0;

    console.log('quot req:', this._addQuotationRequest);

    this.quotationService.addQuotation(this._addQuotationRequest).subscribe({
      next: quotation => {
        this.snackBar.open(
          `Ajánlat sikeresen hozzáadva, azonosítója: ${quotation.id}`,
          'OK',
          {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          },
        );
        this.allProductsAndServices.forEach((job: QuotationJobList) => {
          this._addJobRequest.quotationId = quotation.id;
          this._addJobRequest.materialId = job.materialNumber;
          this._addJobRequest.quantity = job.quantity;
          this.jobService.addJob(this._addJobRequest).subscribe({
            next: j => {
              /** */
            },
            error: e => {
              this.snackBar.open(`${job.description}-t nem sikerült hozzáadni az ajánlathoz! Hiba: ${e}`, 'Bezár', {
                duration: 7000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              })
            },
          })
        });
      },
      error: err => {
        this.error = err;
        this.snackBar.open(this.error, 'Bezár', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        })
      },
    });
  }
}
