import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Role } from 'src/app/modules/users/models/role.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  customers = new MatTableDataSource<Customer>([]);
  currentUser: User | undefined;
  displayedColumns: Array<keyof Customer | string> = [];

  customersLoaded$ = new BehaviorSubject<boolean>(false);

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
        this.customers.data = customers;
        this.displayedColumns = ['id', 'name', 'country', 'postcode', 'street', 'houseNumber', 'email', 'phoneNumber', 'taxNumber'];
        if (this.currentUser && this.currentUser.role >= Role.Manager)
          this.displayedColumns.push('edit');
        this.customersLoaded$.next(true);

        this.customers.sortingDataAccessor = (
          item: Customer,
          property: string,
        ) => {
          console.log(item.id);
          switch (property) {
            case 'id':
              return item.id;
            case 'name':
            case 'country':
            case 'city':
            case 'street':
            case 'houseNumber':
            case 'email':
              return item[property]?.toLowerCase() ?? '';
            case 'postcode':
            case 'phoneNumber':
            case 'taxNumber':
              return item[property] ?? '';
            default:
              return '';
          }
        };
        setTimeout(() => {
          this.customers.sort = this.sort;
          this.customers.paginator = this.paginator;
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
    this.customers.filter = value;
  }
}
