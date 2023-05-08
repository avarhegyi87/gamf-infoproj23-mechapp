import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { User } from 'src/app/modules/users/models/user.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  customers: MatTableDataSource<Customer> | undefined;
  currentUser: User | undefined;
  displayedColumns: Array<keyof Customer> = [];

  private customersLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe({
      next: customers => {
        if (customers && customers.length > 0) {
          this.customers = new MatTableDataSource<Customer>(customers);
          this.displayedColumns = Object.keys(this.customers.data[0]) as Array<
            keyof Customer
          >;
          this.customers.sortingDataAccessor = (item: Customer, property: string) => {
            switch (property) {
              case '$id':
                return item.$id;
              case 'name':
              case 'country':
              case 'city':
              case 'street':
              case 'houseNumber':
              case 'email':
                return item[property]?.toLowerCase() ?? '';
              case 'postCode':
              case 'phoneNumber':
              case 'taxNumber':
                return item[property] ?? '';
              default:
                return '';
            }
          };
          this.customersLoaded$.next(true);
        } else {
          this.customers = undefined;
          this.customersLoaded$.next(true);
        }
      },
      error: response => {
        this.snackBar.open(response, 'Close', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      },
    });
  }

  ngAfterViewInit(): void {
    this.customersLoaded$.subscribe(loaded => {
      if (loaded && this.customers) {
        this.customers.sort = this.sort;
        this.customers.paginator = this.paginator;
      }
    });

    console.log('customers', this.customers);
    console.log('this.sort', this.sort);
    console.log('this.paginator', this.paginator);
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
}
