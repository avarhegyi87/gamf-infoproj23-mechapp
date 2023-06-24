import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable, startWith, map } from 'rxjs';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Role } from 'src/app/modules/users/models/role.model';
import { FuelTypeToLabelMapping, FuelTypeEnum } from 'src/app/modules/vehicle/models/fuel-types';
import { FormBuilder, FormControl } from '@angular/forms';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Quotation } from '../../models/quotation.model';
import { QuotationService } from '../../services/quotation.service';
import { QuotationStateEnum, QuotationStateToLabelMapping } from 'src/app/modules/quotation/models/states';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';

@Component({
  selector: 'app-details-quotation',
  templateUrl: './details-quotation.component.html',
  styleUrls: ['./details-quotation.component.scss'],
})
export class DetailsQuotationComponent implements OnInit {

  currentUser: User | undefined;
  displayedColumns: Array<string> = [];
  states = Object.values(QuotationStateEnum);
  statesMapping = QuotationStateToLabelMapping;

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
  quotationDetails: Quotation = {
    id: 0,
    vehicleId: 0,
    customerId: 0,
    createdBy: 0,
    updatedBy: 0,
    description: '0',
    state: 0,
  }

  constructor(   
    private quotationService: QuotationService,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    )
  {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;

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
              this.customerService.getCustomer(response.customerId.toString()).subscribe({
                next: customerResponse => {
                  this.quotationDetails.customerId = customerResponse;
                  this.customer = customerResponse;
                },
              });
              this.vehicleService.getVehicle(Number(response.vehicleId)).subscribe({
                next: vehicleResponse => {
                  this.quotationDetails.vehicleId = vehicleResponse;
                  this.vehicle = vehicleResponse;
                },
              });
            },
          });
        }
      },
    });
  }


  
}
