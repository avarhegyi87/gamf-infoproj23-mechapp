import { Component, OnInit } from '@angular/core';

import { Customer } from 'src/app/modules/customer/models/customer.model';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { Job } from 'src/app/modules/job/models/job.model';
import { Material } from 'src/app/modules/material/models/material.model';
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
import { JobService } from 'src/app/modules/job/services/job.service';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { QuotationJobList } from '../../models/quotation-job-list.model';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss'],
})
export class AddQuotationComponent implements OnInit {
  partsTableForm!: FormGroup;
  partList: QuotationJobList[] = [];
  jobsTableForm!: FormGroup;
  jobList: QuotationJobList[] = [];

  addQuotationForm!: FormGroup;
  customers: Customer[] = [];
  jobs: Job[] = [];

  parts: Material[] = [];
  addedPart!: Material;
  partControl = new FormControl<string | Material>('');
  filteredParts!: Observable<Material[]>;
  jobTypes: Material[] = [];
  addedJob!: Material;
  jobTypesControl = new FormControl<string | Material>('');
  filteredJobTypes!: Observable<Material[]>;
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');
  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  vehicleControl = new FormControl<string | Vehicle>('');
  serviceList: String[] = [];
  materialList: String[] = [];
  customerSelected = false;
  error = '';
  submitted = false;
  private _addQuotationRequest: any;
  jobQuantity!: number;
  partQuantity!: number;
  tableJobs: Job[] = [];
  tableParts: Job[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private jobService: JobService,
    private materialService: MaterialService,
    private snackBar: MatSnackBar,
  ) {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });

    this.materialService.getMaterials().subscribe(materials => {
      this.parts = materials;
    });

    this.materialService.getWorks().subscribe(works => {
      this.jobTypes = works;
    });

    this._addQuotationRequest = {
      id: null,
      customerId: null,
      vehicleId: null,
      createdBy: null,
      updatedBy: null,
      description: null,
      parts: null,
      jobTypes: null,
      state: null,
      finalizeDate: null,
    };
  }

  ngOnInit(): void {
    this.partsTableForm = this.formBuilder.group({
      part: [null, Validators.compose([Validators.required])],
      partQuantity: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });

    this.jobsTableForm = this.formBuilder.group({
      job: [null, Validators.compose([Validators.required])],
      jobQuantity: ['', Validators.compose([Validators.required, Validators.min(1)])],
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

    this.filteredJobTypes = this.jobTypesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const description =
          typeof value === 'string' ? value : value?.description;
        return description
          ? this._filterJobTypes(description as string)
          : this.jobTypes.slice();
      }),
    );

    this.addQuotationForm = this.formBuilder.group({
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

      parts: [
        null,
        this._addQuotationRequest.parts && this._addQuotationRequest.parts > 0,
      ],

      jobTypes: [
        null,
        this._addQuotationRequest.jobTypes &&
          this._addQuotationRequest.jobTypes > 0,
      ],

      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255),
        ]),
      ],
      partQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(100),
        ]),
      ],
      jobQuantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  get f() {
    return this.addQuotationForm.controls;
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
    return this.jobTypes.filter(option =>
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

  displayJobTypes(part: Material): string {
    return part.description ? part.description : '';
  }

  onJobOptionSelected(mat: Material) {
    this.addedJob = mat;
  }

  isInvalid(field: string): boolean {
    return (
      this.f[field].invalid && (this.f[field].touched || this.f[field].dirty)
    );
  }

  public get partsTableArray(): any {
    return this.partsTableForm.get('tableArray') as FormGroup;
  }

  public get jobsTableArray(): any {
    return this.jobsTableForm.get('tableArray') as FormGroup;
  }

  onSubmit() {
    /**TODO: onSubmit for AddQuotation */
  }

  addNewPart() {
    const newPart: QuotationJobList = {
      materialNumber: this.addedPart.materialNumber,
      description: this.addedPart.description,
      quantity: this.partsTableForm.get('partQuantity')?.value,
      unitPrice: this.addedPart.netPrice,
      subTotal: this.addedPart.netPrice * this.partsTableForm.get('partQuantity')?.value,
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

  addNewJob() {
    const newJob: QuotationJobList = {
      materialNumber: this.addedJob.materialNumber,
      description: this.addedJob.description,
      quantity: this.jobsTableForm.get('jobQuantity')?.value,
      unitPrice: this.addedJob.netPrice,
      subTotal: this.addedJob.netPrice * this.jobsTableForm.get('jobQuantity')?.value,
    }
    const existingJob: QuotationJobList | undefined = this.jobList.find(
      x => x.materialNumber === newJob.materialNumber,
    );
    if (existingJob) {
      existingJob.quantity += newJob.quantity;
      existingJob.subTotal = existingJob.unitPrice * existingJob.quantity;
    } else {
      this.jobList.push(newJob);
    }
    this.jobsTableForm.reset();
  }
}
