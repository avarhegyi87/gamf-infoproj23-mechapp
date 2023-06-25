import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Quotation } from '../../models/quotation.model';
import { QuotationService } from '../../services/quotation.service';
import {
  QuotationStateEnum,
  QuotationStateToLabelMapping,
} from 'src/app/modules/quotation/models/states';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { JobService } from 'src/app/modules/job/services/job.service';
import { Job } from 'src/app/modules/job/models/job.model';
import { Material } from 'src/app/modules/material/models/material.model';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { QuotationJobList } from '../../models/quotation-job-list.model';
import { VAT_HUN } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-details-quotation',
  templateUrl: './details-quotation.component.html',
  styleUrls: ['./details-quotation.component.scss'],
})
export class DetailsQuotationComponent implements OnInit {
  currentUser!: User;
  displayedColumns: Array<string> = [];
  states = Object.values(QuotationStateEnum);
  statesMapping = QuotationStateToLabelMapping;
  selectedState!: QuotationStateEnum;

  customers: Customer[] = [];
  customer!: Customer;
  filteredCustomers!: Observable<Customer[]>;
  selectedCustomer: Customer | undefined;
  customerControl = new FormControl<string | Customer>('');

  vehicles: Vehicle[] = [];
  vehicle!: Vehicle;
  filteredVehicles!: Observable<Vehicle[]>;
  selectedVehicle: Vehicle | undefined;
  vehicleControl = new FormControl<string | Vehicle>('');

  jobs: Job[] = [];
  materials: Material[] = [];
  totalNet = 0;

  tableJobList: QuotationJobList[] = [];

  vat = VAT_HUN;

  error = '';

  quotationDetails: Quotation = {
    id: 0,
    vehicleId: 0,
    customerId: 0,
    createdBy: 0,
    updatedBy: 0,
    description: '0',
    state: 0,
  };

  quotation: Quotation = {
    id: 0,
    vehicleId: 0,
    customerId: 0,
    createdBy: 0,
    updatedBy: 0,
    description: '0',
    state: 0,
  };

  quotationsLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private quotationService: QuotationService,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private jobService: JobService,
    private materialService: MaterialService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
    this.materialService.getAllMaterials().subscribe(materials => {
      this.materials = materials;
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.quotationService.getById(parseInt(id)).subscribe({
            next: response => {
              this.quotationDetails = response;

              this.customerService
                .getCustomer(response.customerId.toString())
                .subscribe({
                  next: customerResponse => {
                    this.quotationDetails.customerId = customerResponse;
                    this.customer = customerResponse;
                  },
                });

              this.vehicleService
                .getVehicle(Number(response.vehicleId))
                .subscribe({
                  next: vehicleResponse => {
                    this.quotationDetails.vehicleId = vehicleResponse;
                    this.vehicle = vehicleResponse;
                    this.quotationsLoaded$.next(true);
                  },
                });

              this.jobService
                .getByQuotationId(response.id)
                .subscribe(jobs => {
                  this.jobs = jobs;
                  this.materials.forEach(material => {
                    this.jobs.forEach(job => {
                      if (String(job.materialId) == material.materialNumber) {
                        const newService: QuotationJobList = {
                          materialNumber: material.materialNumber,
                          description: material.description,
                          quantity: job.unit,
                          unitPrice: material.netPrice,
                          subTotal: material.netPrice * job.unit,
                        };
                        this.totalNet = this.totalNet + newService.subTotal;
                        this.tableJobList.push(newService);
                      }
                    });
                  });
                });

              this.selectedState = this.quotationDetails.state;
            },
          });
        }
      },
    });
  }

  getState(id: number): string {
    if (id == 0)
      return this.statesMapping[0];
    else if (id == 1)
      return this.statesMapping[1];
    else if (id == 2)
      return this.statesMapping[2];

    return 'Hibás státusz.';
  }

  acceptState() {
    this.selectedState = 1;
    var now = new Date();
    var formatted =
      now.toISOString().split('T')[0] +
      ' ' +
      now.toISOString().split('T')[1].split('.')[0];
    this.quotation.id = this.quotationDetails.id;
    this.quotation.customerId = this.customer.id;
    this.quotation.vehicleId = this.vehicle.id;
    this.quotation.description = this.quotationDetails.description;
    this.quotation.state = this.selectedState;
    this.quotation.createdBy = this.quotationDetails.createdBy;
    this.quotation.updatedBy = this.currentUser.id;
    this.quotation.finalizeDate = formatted;
    this.quotationService
      .updateQuotation(this.quotation.id, this.quotation)
      .subscribe({
        next: quotation => {
          this.snackBar.open(
            `${this.quotationDetails.id} - azonosítójú űrlap sikeresen módosítva.`,
            'OK',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            },
          );
          (async () => {
            await this.router.navigate(['quotation/list']);
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

  rejectState() {
    this.selectedState = 2;
    this.quotation.id = this.quotationDetails.id;
    this.quotation.customerId = this.customer.id;
    this.quotation.vehicleId = this.vehicle.id;
    this.quotation.description = this.quotationDetails.description;
    this.quotation.state = this.selectedState;
    this.quotation.createdBy = this.quotationDetails.createdBy;
    this.quotation.updatedBy = this.currentUser.id;
    this.quotationService
      .updateQuotation(this.quotation.id, this.quotation)
      .subscribe({
        next: quotation => {
          this.snackBar.open(
            `${this.quotationDetails.id} - azonosítójú űrlap sikeresen módosítva.`,
            'OK',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            },
          );
          (async () => {
            await this.router.navigate(['quotation/list']);
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
