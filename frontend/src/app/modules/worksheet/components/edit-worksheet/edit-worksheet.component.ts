import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Quotation } from 'src/app/modules/quotation/models/quotation.model';
import { QuotationService } from 'src/app/modules/quotation/services/quotation.service';
import {
  QuotationStateEnum,
  QuotationStateToLabelMapping,
} from 'src/app/modules/quotation/models/states';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { JobService } from 'src/app/modules/job/services/job.service';
import { Job } from 'src/app/modules/job/models/job.model';
import { Material } from 'src/app/modules/material/models/material.model';
import { MaterialService } from 'src/app/modules/material/services/material.service';
import { QuotationJobList } from 'src/app/modules/quotation/models/quotation-job-list.model';
import { VAT_HUN } from 'src/app/shared/constants/constants';
import { WorksheetService } from '../../services/worksheet.service';
import { Worksheet } from '../../models/worksheet.model';

@Component({
  selector: 'app-edit-worksheet',
  templateUrl: './edit-worksheet.component.html',
  styleUrls: ['./edit-worksheet.component.scss'],
})
export class EditWorksheetComponent implements OnInit {
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

  quotationJobs: Job[] = [];
  worksheetJobs: Job[] = [];
  materials: Material[] = [];
  totalNet = 0;

  tableJobList: QuotationJobList[] = [];
  worksheetJobList: QuotationJobList[] = [];

  vat = VAT_HUN;

  error = '';
  paymentMethod = 1;

  worksheetDetails: Worksheet = {
    id: 0,
    mechanicId: 0,
    startDate: '',
    endDate: '',
    garageId: 0,
    createdBy: 0,
    updatedBy: 0,
    quotationId: 0,
    comment: '',
    invoiced: 0,
  };

  worksheet: Worksheet = {
    id: 0,
    mechanicId: 0,
    startDate: '',
    endDate: '',
    garageId: 0,
    createdBy: 0,
    updatedBy: 0,
    quotationId: 0,
    comment: '',
    invoiced: 0,
  };

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

  worksheetsLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private worksheetService: WorksheetService,
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
    this.materialService.getAllMaterials().subscribe(materials => {
      this.materials = materials;
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.worksheetService.getById(parseInt(id)).subscribe({
            next: response => {
              this.worksheetDetails = response;

              this.quotationService
                .getById(Number(response.quotationId))
                .subscribe({
                  next: quotationResponse => {
                    this.quotationDetails = quotationResponse;
                    this.customerService
                      .getCustomer(String(this.quotationDetails.customerId))
                      .subscribe(customer => {
                        this.customer = customer;
                      });
                    this.vehicleService
                      .getVehicle(Number(this.quotationDetails.vehicleId))
                      .subscribe(vehicle => {
                        this.vehicle = vehicle;
                      });

                    this.jobService
                      .getByQuotationId(Number(response.quotationId))
                      .subscribe(jobs => {
                        this.quotationJobs = jobs;
                        this.materials.forEach(material => {
                          this.quotationJobs.forEach(job => {
                            if (
                              String(job.materialId) == material.materialNumber
                            ) {
                              const newService: QuotationJobList = {
                                materialNumber: material.materialNumber,
                                description: material.description,
                                quantity: job.unit,
                                unitPrice: material.netPrice,
                                subTotal: material.netPrice * job.unit,
                              };
                              this.totalNet =
                                this.totalNet + newService.subTotal;
                              this.tableJobList.push(newService);
                            }
                          });
                        });
                      });

                    this.jobService
                      .getByWorksheetId(response.id)
                      .subscribe(jobs => {
                        this.worksheetJobs = jobs;
                        this.materials.forEach(material => {
                          this.worksheetJobs.forEach(job => {
                            if (
                              String(job.materialId) == material.materialNumber
                            ) {
                              const newService: QuotationJobList = {
                                materialNumber: material.materialNumber,
                                description: material.description,
                                quantity: job.unit,
                                unitPrice: material.netPrice,
                                subTotal: material.netPrice * job.unit,
                              };
                              this.totalNet =
                                this.totalNet + newService.subTotal;
                              this.worksheetJobList.push(newService);
                            }
                          });
                        });
                      });
                  },
                });
            },
          });
        }
        this.worksheetsLoaded$.next(true);
      },
    });
  }

  finish() {
    this.worksheetDetails.invoiced = 1;
    var now = new Date();
    var formatted =
      now.toISOString().split('T')[0] +
      ' ' +
      now.toISOString().split('T')[1].split('.')[0];
    this.worksheetDetails.endDate = formatted;
    this.worksheetDetails.updatedBy = this.currentUser.id;
    this.worksheetService
      .updateWorksheet(this.worksheetDetails.id, this.worksheetDetails)
      .subscribe({
        next: worksheet => {
          this.snackBar.open(
            `${this.worksheetDetails.id} - azonosítójú űrlap sikeresen módosítva.`,
            'OK',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-primary'],
            },
          );
          (async () => {
            await this.router.navigate([
              'worksheet/invoice',
              this.worksheetDetails.id,
              this.paymentMethod,
            ]);
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
