import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from '../../models/vehicle.model';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable, startWith, map } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Role } from 'src/app/modules/users/models/role.model';
import { FuelTypeToLabelMapping, FuelTypeEnum } from '../../models/fuel-types';
import { FormControl } from '@angular/forms';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  vehicles = new MatTableDataSource<Vehicle>([]);
  currentUser: User | undefined;
  displayedColumns: Array<keyof Vehicle | string> = [];
  fuelTypeMapping = FuelTypeToLabelMapping;
  fuelTypes = Object.values(FuelTypeEnum);

  customers: Customer[] = [];
  filteredCustomers!: Observable<Customer[]>;
  selectedCustomer: Customer | undefined;
  customerControl = new FormControl<string | Customer>('');

  vehiclesLoaded$ = new BehaviorSubject<boolean>(false);
  isMobile = false;

  constructor(
    private vehicleService: VehicleService,
    private customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.Medium]).subscribe(result => {
      this.isMobile = result.matches;
    })

    this.filteredCustomers = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const customerName = typeof value === 'string' ? value : value?.name;
        return customerName ? this._filter(customerName as string) : this.customers.slice();
      }),
    );

    this.vehicleService.getAllVehicles().subscribe({
      next: vehicles => {
        this.vehicles.data = this.selectedCustomer
          ? vehicles.filter(
            vehicle => vehicle.customer.id === this.selectedCustomer?.id,
          )
          : vehicles;
        this.displayedColumns = Object.keys(this.vehicles.data[0]) as Array<
          keyof Vehicle | string
        >;
        if (this.currentUser && this.currentUser.role >= Role.Manager)
          this.displayedColumns.push('edit');
        this.vehiclesLoaded$.next(true);

        this.vehicles.sortingDataAccessor = (
          item: Vehicle,
          property: string,
        ) => {
          switch (property) {
            case 'id':
              return item.id;
            case 'customer':
              return item.customer.name;
            case 'vin':
            case 'licencePlate':
            case 'carBrand':
            case 'carMake':
            case 'fuelType':
              return item[property]?.toLowerCase() ?? '';
            case 'mileage':
            case 'displacement':
            case 'productionYear':
              return item[property] ?? '';
            default:
              return '';
          }
        };
        setTimeout(() => {
          this.vehicles.sort = this.sort;
          this.vehicles.paginator = this.paginator;
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

  displayFn(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  private _filter(searchTerm: string): Customer[] {
    const filterValue = searchTerm.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      sortState.direction === 'asc'
        ? this._liveAnnouncer.announce('Növekvő sorrendbe rendezve')
        : this._liveAnnouncer.announce('Csökkenő sorrendbe rendezve');
    } else {
      this._liveAnnouncer.announce('Sorbarendezés törölve');
    }
  }

  applyFilter(value: string) {
    value = value.trim().toLowerCase();
    this.vehicles.filter = value;
  }
}
