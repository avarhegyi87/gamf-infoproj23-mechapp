import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from '../../models/material.model';
import { User } from 'src/app/modules/users/models/user.model';
import { MaterialTypeEnum, MaterialTypeToLabelMapping } from '../../models/material-type.model';
import { BehaviorSubject } from 'rxjs';
import { MaterialService } from '../../services/material.service';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  materials = new MatTableDataSource<Material>([]);
  currentUser: User | undefined;
  displayedColumns: Array<keyof Material | string> = [];
  materialTypeMapping = MaterialTypeToLabelMapping;
  materialTypes = Object.values(MaterialTypeEnum);

  materialsLoaded$ = new BehaviorSubject<boolean>(false);
  isMobile = false;

  constructor(
    private materialService: MaterialService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.authService.getCurrentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit(): void {}

}
