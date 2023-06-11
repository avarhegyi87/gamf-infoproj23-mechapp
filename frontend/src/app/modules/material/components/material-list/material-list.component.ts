import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from '../../models/material.model';
import { User } from 'src/app/modules/users/models/user.model';
import {
  MaterialTypeEnum,
  MaterialTypeToLabelMapping,
} from '../../models/material-type.model';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { MaterialService } from '../../services/material.service';
import { AuthenticationService } from 'src/app/modules/users/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Role } from 'src/app/modules/users/models/role.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  materials = new MatTableDataSource<Material>([]);
  filteredMaterials!: Observable<Material[]>;
  materialControl = new FormControl<string | MaterialTypeEnum>('');
  currentUser: User | undefined;
  displayedColumns: Array<keyof Material | string> = [];
  materialTypeMapping = MaterialTypeToLabelMapping;
  materialTypes = Object.values(MaterialTypeEnum);
  selectedMatType: MaterialTypeEnum | undefined;

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

  ngOnInit(): void {
    this.materialService.getAllMaterials().subscribe({
      next: mat => {
        this.materials.data = this.selectedMatType
          ? mat.filter(
            item =>
              MaterialTypeToLabelMapping[
                this.getMatType(item.materialNumber.toString())
              ] === this.selectedMatType,
          )
          : mat;
        this.displayedColumns = [
          'id',
          'matType',
          'description',
          'currentStock',
          'netPrice',
        ];
        if (this.currentUser && this.currentUser.role >= Role.Manager)
          this.displayedColumns.push('edit');
        this.materialsLoaded$.next(true);

        this.materials.sortingDataAccessor = (
          item: Material,
          property: string,
        ) => {
          switch (property) {
            case 'id':
              return item.materialNumber;
            //case 'matType':
            case 'description':
              return item[property]?.toLowerCase() ?? '';
            case 'currentStock':
            case 'netPrice':
              return item[property] ?? '';
            default:
              return '';
          }
        };
        setTimeout(() => {
          this.materials.sort = this.sort;
          this.materials.paginator = this.paginator;
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

  getMatType(materialNum: string): MaterialTypeEnum {
    switch (true) {
      case materialNum.startsWith('1'):
        return MaterialTypeEnum.material;
      case materialNum.startsWith('6'):
        return MaterialTypeEnum.service;
      default:
        return MaterialTypeEnum.material;
    }
  }

  onMaterialTypeOptionSelected(matType: MaterialTypeEnum | null) {
    this.selectedMatType = matType || undefined;
    this.ngOnInit();
  }

  clearSelectedMaterialType() {
    this.selectedMatType = undefined;
    this.ngOnInit();
  }

  getMaterialTypeLabel(key: MaterialTypeEnum): string {
    return MaterialTypeToLabelMapping[key];
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
    this.materials.filter = value;
  }
}
