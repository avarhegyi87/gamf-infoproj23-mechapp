import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/modules/users/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Role } from 'src/app/modules/users/models/role.model';
import { FormControl } from '@angular/forms';
import { Quotation } from 'src/app/modules/quotation/models/quotation.model';
import { QuotationService } from 'src/app/modules/quotation/services/quotation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  QuotationStateEnum,
  QuotationStateToLabelMapping,
} from 'src/app/modules/quotation/models/states';
import { WorksheetService } from '../../services/worksheet.service';
import { Worksheet } from '../../models/worksheet.model';

@Component({
  selector: 'app-worksheet-list',
  templateUrl: './worksheet-list.component.html',
  styleUrls: ['./worksheet-list.component.scss'],
})
export class WorksheetListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  worksheets = new MatTableDataSource<Worksheet>([]);
  displayedColumns: Array<string> = [];


  quotations: Quotation [] = [];
  currentUser: User | undefined;
  states = Object.values(QuotationStateEnum);
  statesMapping = QuotationStateToLabelMapping;
  filteredQuotations!: Observable<Quotation[]>;
  selectedQuotation: Quotation | undefined;
  quotationControl = new FormControl<string | Quotation>('');

  isMobile = false;
  worksheetsLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private worksheetService: WorksheetService,
    private quotationService: QuotationService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
    this.quotationService.getAllQuotations().subscribe(quotations => {
      this.quotations = quotations;
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

    this.worksheetService.getAllWorksheets().subscribe({
      next: worksheets => {
        this.worksheets.data = worksheets;

        this.displayedColumns = Object.keys(this.worksheets.data[0]).filter(
          column =>
            ![
              'startDate',
              'endDate',
              'createdBy',
              'updatedBy',
              'comment',
              'created_at',
              'updated_at',
            ].includes(column),
        );

        if (this.currentUser && this.currentUser?.role >= Role.Manager)
          this.displayedColumns.push('edit');
        this.worksheetsLoaded$.next(true);

        this.worksheets.sortingDataAccessor = (
          item: Worksheet,
          property: string,
        ) => {
          switch (property) {
            case 'id':
              return item.id;
            case 'quotationId':
              return item.quotationId.toString().toLowerCase();
            case 'mechanicId':
              return item.mechanicId.toString().toLowerCase();
            case 'garageId':
              return item.garageId.toString().toLowerCase();
            case 'invoiced':
              return item.invoiced.toString().toLowerCase();

            default:
              return '';
          }
        };
        setTimeout(() => {
          this.worksheets.sort = this.sort;
          this.worksheets.paginator = this.paginator;
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

  getState(id: number): string {
    if (id == 0)
      return this.statesMapping[0];
    else if (id == 1)
      return this.statesMapping[1];
    else if (id == 2)
      return this.statesMapping[2];

    return 'Hibás státusz.';
  }

  getInvoiced(inv: Number): string {

    if (inv == 0)
      return "Nem";

    else if (inv == 1)
      return "Igen";

    return "Olvasási hiba";
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

}
