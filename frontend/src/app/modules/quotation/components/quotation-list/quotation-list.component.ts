import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/modules/vehicle/models/vehicle.model';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable, startWith, map } from 'rxjs';
import { VehicleService } from 'src/app/modules/vehicle/services/vehicle.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Role } from 'src/app/modules/users/models/role.model';
import { FuelTypeToLabelMapping, FuelTypeEnum } from 'src/app/modules/vehicle/models/fuel-types';
import { FormControl } from '@angular/forms';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { Quotation } from '../../models/quotation.model';
import { QuotationService } from '../../services/quotation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { QuotationStateEnum, QuotationStateToLabelMapping } from 'src/app/modules/quotation/models/states';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  quotations = new MatTableDataSource<Quotation>([]);
  currentUser: User | undefined;
  displayedColumns: Array<string> = [];
  states = Object.values(QuotationStateEnum);
  statesMapping = QuotationStateToLabelMapping;

  customers: Customer[] = [];
  filteredCustomers!: Observable<Customer[]>;
  selectedCustomer: Customer | undefined;
  customerControl = new FormControl<string | Customer>('');

  vehicles: Vehicle[] = [];
  filteredVehicles!: Observable<Vehicle[]>;
  selectedVehicle: Vehicle | undefined;
  vehicleControl = new FormControl<string | Vehicle>('');

  isMobile = false;
  quotationsLoaded$ = new BehaviorSubject<boolean>(false);

    constructor(
    private quotationService: QuotationService,
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
    this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.Medium,
      ])
      .subscribe(result => {
        this.isMobile = result.matches;
      });

      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const customerName = typeof value === 'string' ? value : value?.name;
          return customerName
            ? this._filter(customerName as string)
            : this.customers.slice();
        }),
      );

      this.quotationService.getAllQuotations().subscribe({
        next: quotations => {
          this.quotations.data = this.selectedCustomer
            ? quotations.filter(
              quotation => quotation.customerId === this.selectedCustomer?.id,
            )
            : quotations;
          this.quotations.data.map(
            item =>
              (item.customerId =
                this.customers.find(c => c.id === item.customerId) ||
                item.customerId,
                item.vehicleId = this.vehicles.find(v => v.id === item.vehicleId) || 
                item.vehicleId),
          );

          this.displayedColumns = Object.keys(this.quotations.data[0]).filter(
            column => !['createdBy', 'updatedBy', 'description', 'finalizeDate', 'created_at', 'updated_at', ''].includes(column),
          );
  
          if (this.currentUser && this.currentUser?.role >= Role.Manager)
            this.displayedColumns.push('description');
          this.quotationsLoaded$.next(true);
  
          this.quotations.sortingDataAccessor = (
            item: Quotation,
            property: string,
          ) => {
            switch (property) {
              case 'id':
                return item.id;
                case 'vehicleId':
                  return item.vehicleId.toString().toLowerCase();  
              case 'customerId':
                return item.customerId.toString().toLowerCase();
              case 'state':
                return item.state.toString().toLowerCase();

              default:
                return '';
            }
          };
          setTimeout(() => {
            this.quotations.sort = this.sort;
            this.quotations.paginator = this.paginator;
          }, 0);
        },
        error: response => {
          this.snackBar.open(response, 'Bezár', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        },
      });


  }

  getState(id: number): string{
    if(id == 0){
      return this.statesMapping[0];
    }
    else if (id == 1) {
    
      return this.statesMapping[1];
    }
    else if (id == 2) {
          return this.statesMapping[2];
    }
    return "Hibás státusz."
    
  }

  displayFn(customer: Customer): string {
    return customer?.name ? customer.name : '';
  }

  private _filter(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option =>
      option.name.toLowerCase().includes(filterValue),
    );
  }

  onCustomerOptionSelected(customer: Customer | null) {
    this.selectedCustomer = customer || undefined;
    this.ngOnInit();
  }

  clearSelectedCustomer() {
    this.selectedCustomer = undefined;
    this.ngOnInit();
  }

  getFuelTypeLabel(key: FuelTypeEnum): string {
    return FuelTypeToLabelMapping[key];
  }

  async announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      sortState.direction === 'asc'
        ? await this._liveAnnouncer.announce('Növekvő sorrendbe rendezve')
        : await this._liveAnnouncer.announce('Csökkenő sorrendbe rendezve');
    } else {
      await this._liveAnnouncer.announce('Sorbarendezés törölve');
    }
  }

  applyFilter(value: string) {
    value = value.trim().toLowerCase();
    this.quotations.filter = value;
  }

}
