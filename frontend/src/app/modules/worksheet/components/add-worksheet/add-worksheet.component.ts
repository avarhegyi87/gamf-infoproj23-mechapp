import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Job } from 'src/app/modules/job/models/job.model';
import { JobService } from 'src/app/modules/job/services/job.service';
import { Material } from 'src/app/modules/material/models/material.model';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { QuotationJobList } from 'src/app/modules/quotation/models/quotation-job-list.model';
import { Quotation } from 'src/app/modules/quotation/models/quotation.model';
import { QuotationService } from 'src/app/modules/quotation/services/quotation.service';
import { User } from 'src/app/modules/users/models/user.model';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { DynamicTableComponent } from 'src/app/shared/components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-add-worksheet',
  templateUrl: './add-worksheet.component.html',
  styleUrls: ['./add-worksheet.component.scss'],
})
export class AddWorksheetComponent implements OnInit {
  // authenticated user
  currentUser: User | undefined;

  // worksheet request and main form
  private _addWorksheetRequest: any;
  addWorksheetForm!: FormGroup;

  // properties for filtering Customers in the auto-complete field of addWorksheetForm
  customers: Customer[] = [];
  filteredCustomers!: Observable<Customer[]>;
  customerControl = new FormControl<string | Customer>('');
  selectedCustomer: Customer | undefined;
  isCustomerSelected = false;

  // properties for filtering Vehicles in the auto-complete field of addWorksheetForm
  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  vehicleControl = new FormControl<string | Vehicle>('');
  selectedVehicle: Vehicle | undefined;
  isVehicleSelected = false;

  // properties for Quotations
  quotations: Quotation[] = [];
  filteredQuotations!: Observable<Quotation[]>;
  quotationControl = new FormControl<string | Quotation>('');
  selectedQuotation: Quotation | undefined;
  jobsOnQuotation: Job[] = [];

  // properties for Jobs

  // properties for filtering Materials in the auto-complete field of addWorksheetForm
  addMaterialForm!: FormGroup;
  materials: Material[] = [];
  filteredMaterials!: Observable<Material[]>;
  materialControl = new FormControl<string | Material>('');
  materialToAdd!: Material;
  materialsAdded: QuotationJobList[] = [];

  // DynamicTableComponent for adding materials
  @ViewChildren(DynamicTableComponent) dynamicTable!: DynamicTableComponent;

  // other properties
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private materialService: MaterialService,
    private jobService: JobService,
    private authService: AuthenticationService,
  ) {
    this.authService.getCurrentUser.subscribe(user => this.currentUser = user);

    this.customerService.getAllCustomers().subscribe(customers => this.customers = customers);

    this.materialService.getAllMaterials().subscribe(materials => this.materials = materials);
  }

  ngOnInit(): void {
    this._addWorksheetRequest = {
      id: 0,
      mechanicId: 0,
      startDate: 0,
      garageId: 0,
      createdBy: 0,
      quotationId: 0,
      comment: '',
      invoiced: false,
    }

    this.addWorksheetForm = this.formBuilder.group(
      {
        customer: [null],
        vehicle: [null],
        quotation: [null],
        comment: [''],
        garage: ['', Validators.compose([Validators.required])],
      },
    );

    this.addMaterialForm = this.formBuilder.group({
      material: [null],
      quantity: ['', Validators.compose([Validators.required, Validators.min(1)]),
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

    this.filteredMaterials = this.materialControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const description = typeof value === 'string' ? value : value?.description;
        return description ? this._filterMaterial(description as string) : this.materials.slice();
      }),
    );
  }

  private _filterCustomer(searchTerm: string): Customer[] {
    return this.customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  private _filterVehicle(searchTerm: string): Vehicle[] {
    return this.vehicles.filter(v => v.licencePlate.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  private _filterMaterial(searchTerm: string): Material[] {
    return this.materials.filter(m => m.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  isInvalidWsField(field: string): boolean {
    return (
      this.addWorksheetForm.controls[field].invalid &&
      (this.addWorksheetForm.controls[field].touched ||
        this.addWorksheetForm.controls[field].dirty)
    );
  }

  isInvalidMatField(field: string): boolean {
    return (
      this.addMaterialForm.controls[field].invalid &&
      (this.addMaterialForm.controls[field].touched ||
        this.addMaterialForm.controls[field].dirty)
    );
  }

  onCustomerOptionSelected(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isCustomerSelected = true;
    this.vehicleService.getVehiclesByCustomer(customer.id).subscribe(vehicles => {
      this.vehicles = vehicles;
    });
    this.quotationService.getByCustomerId(customer.id).subscribe(q => {
      this.quotations = q;
    });
  }

  displayCustomer(customer: Customer): string {
    return customer.name || '';
  }

  onVehicleOptionSelected(vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;
    this.isVehicleSelected = true;
    this.quotationService.getByVehicleId(vehicle.id).subscribe(quotations => {
      this.quotations = quotations;
    });
  }

  displayVehicle(vehicle: Vehicle): string {
    return vehicle.licencePlate || '';
  }

  onQuotationOptionSelected(event: any): void {
    this.selectedQuotation = event.value;
    if (this.selectedQuotation) {
      this.jobsOnQuotation = [];
      this.jobService.getByQuotationId(this.selectedQuotation.id).subscribe(jobs => {
        this.jobsOnQuotation = jobs;
      });
      this.jobsOnQuotation.forEach(job => {
        this.materialService.getMaterial(job.materialId.toString()).subscribe(m => {
          job.materialId = m;
        });
      })
    }
  }

  getJobMaterialById(id: string): Material | undefined {
    return this.materials.find(m => m.materialNumber === id);
  }

  onInputBlur(event: Event, source: string): void {
    const inputValue = (event.target as HTMLInputElement).value;
    switch (source) {
      case 'customer':
        if (!inputValue) {
          this.selectedCustomer = undefined;
          this.isCustomerSelected = false;
        }
        break;

      case 'vehicle':
        if (!inputValue) {
          this.selectedVehicle = undefined;
          this.isVehicleSelected = false;
        }
        break;

      default:
        break;
    }
  }

  onMaterialOptionSelected(material: Material): void {
    this.materialToAdd = material;
  }

  addNewMaterial(): void {
    const newMaterial: QuotationJobList = {
      materialNumber: this.materialToAdd.materialNumber,
      description: this.materialToAdd.description,
      quantity: this.addMaterialForm.get('quantity')?.value,
      unitPrice: this.materialToAdd.netPrice,
      subTotal: this.materialToAdd.netPrice * this.addMaterialForm.get('quantity')?.value,
    };
    const existingMaterial: QuotationJobList | undefined = this.materialsAdded.find(
      m => m.materialNumber === newMaterial.materialNumber,
    );
    if (existingMaterial) {
      existingMaterial.quantity += newMaterial.quantity;
      existingMaterial.subTotal = existingMaterial.unitPrice * existingMaterial.quantity;
    } else {
      this.materialsAdded.push(newMaterial);
    }
    this.addMaterialForm.reset();
  }

  displayMaterials(material: Material): string {
    return material.description || '';
  }
}
