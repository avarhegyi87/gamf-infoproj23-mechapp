import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Material } from 'src/app/modules/material/models/material.model';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { Quotation } from 'src/app/modules/quotation/models/quotation.model';
import { QuotationService } from 'src/app/modules/quotation/services/quotation.service';
import { User } from 'src/app/modules/users/models/user.model';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';

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

  // properties for filtering Vehicles in the auto-complete field of addWorksheetForm
  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  vehicleControl = new FormControl<string | Vehicle>('');
  customerSelected = false;

  // properties for filtering Quotations in the auto-complete field of addWorksheetForm
  quotations: Quotation[] = [];
  filteredQuotations!: Observable<Quotation[]>;
  quotationControl = new FormControl<string | Quotation>('');

  // properties for filtering Materials in the auto-complete field of addWorksheetForm
  addMaterialForm!: FormGroup;
  materials: Material[] = [];
  filteredMaterials!: Observable<Material[]>;
  materialControl = new FormControl<string | Material>('');

  // other properties
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private materialService: MaterialService,
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

    /* this.filteredQuotations = this.quotationControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const quotationNumber = typeof value === 'number' ? value : value?.toString;
        return quotationNumber ? this._
      })
    ); */

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
    this.vehicleService.getVehiclesByCustomer(customer.id).subscribe(vehicles => {
      this.vehicles = vehicles;
      this.customerSelected = true;
    });
  }

  displayCustomer(customer: Customer): string {
    return customer.name || '';
  }

  onVehicleOptionSelected(vehicle: Vehicle): void {
    this.quotationService.getByVehicleId(vehicle.id).subscribe(quotations => {
      this.quotations = quotations;
    })
  }
}
