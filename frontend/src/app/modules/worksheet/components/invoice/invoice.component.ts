import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { ActivatedRoute, Router, withDisabledInitialNavigation } from '@angular/router';
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
import { WorksheetService } from 'src/app/modules/worksheet/services/worksheet.service';
import { Worksheet } from 'src/app/modules/worksheet/models/worksheet.model';
import jsPDF  from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
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
  paymentMethod: number = 1;
  paymentMethodText = '';

  worksheetDetails: Worksheet = {
    id: 0,
    mechanicId: 0,
    startDate: "",
    endDate: "",
    garageId: 0,
    createdBy: 0,
    updatedBy: 0,
    quotationId: 0,
    comment: "",
    invoiced: 0,
  };

  worksheet: Worksheet = {
    id: 0,
    mechanicId: 0,
    startDate: "",
    endDate: "",
    garageId: 0,
    createdBy: 0,
    updatedBy: 0,
    quotationId: 0,
    comment: "",
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

  company: any = {
    name: 'Mechanic shop',
    address: 'Izsáki út 2',
    city: '6000 Kecskemét',
    state: 'Bács-Kiskun Vármegye',
    country: 'Magyarország',
    taxNumber: '12345678912',
    phone: '12345678912',
    email: 'info@mechapp.com',
    website: 'http://www.mechapp.hu',
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
   public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('szamla'+this.worksheetDetails.id +'.pdf');
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        this.paymentMethod = Number(params.get('paymentMethod'));
        if (id) {
          this.worksheetService.getById(parseInt(id)).subscribe({
            next: response => {
              this.worksheetDetails = response;

              this.quotationService
                .getById(Number(response.quotationId))
                .subscribe({
                  next: quotationResponse => {
                    this.quotationDetails = quotationResponse;
                    this.customerService.getCustomer(String(this.quotationDetails.customerId)).subscribe(customer => {
                      this.customer = customer;
                    });
                    this.vehicleService.getVehicle(Number(this.quotationDetails.vehicleId)).subscribe(vehicle => {
                      this.vehicle = vehicle;
                    });

                    this.jobService
                      .getByQuotationId(Number(response.quotationId))
                      .subscribe(jobs => {
                        this.quotationJobs = jobs;
                        this.materials.forEach(material => {
                          this.quotationJobs.forEach(job => {
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

                    this.jobService
                      .getByWorksheetId(response.id)
                      .subscribe(jobs => {
                        this.worksheetJobs = jobs;
                        this.materials.forEach(material => {
                          this.worksheetJobs.forEach(job => {
                            if (String(job.materialId) == material.materialNumber) {
                              const newService: QuotationJobList = {
                                materialNumber: material.materialNumber,
                                description: material.description,
                                quantity: job.unit,
                                unitPrice: material.netPrice,
                                subTotal: material.netPrice * job.unit,
                              };
                              this.totalNet = this.totalNet + newService.subTotal;
                              this.worksheetJobList.push(newService);
                            }
                          });
                        });
                      });

                  }
                })
            }
          })
        }
        this.worksheetsLoaded$.next(true);
      },
    });
    if (this.paymentMethod == 1){
      this.paymentMethodText = 'Készpénz';
    }
    else if (this.paymentMethod == 2){
      this.paymentMethodText = 'Bankkártya';
    }
    else if (this.paymentMethod == 3){
      this.paymentMethodText = 'Átutalás';
    }
  }



}

