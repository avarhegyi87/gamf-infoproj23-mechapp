import { QuotationJobList } from './../../../modules/quotation/models/quotation-job-list.model';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DeletionModalComponent } from '../deletion-modal/deletion-modal.component';
import { VAT_HUN } from '../../constants/constants';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['materialNumber', 'description', 'quantity'];
  @ViewChild(MatTable) table!: MatTable<any>;

  vat = VAT_HUN;

  private _data: QuotationJobList[] = [];
  public get data(): QuotationJobList[] {
    return this._data;
  }
  @Input()
  public set data(v: QuotationJobList[]) {
    this._data = v;
    this.updateTable();
  }

  public get totalNet(): number {
    return this._data.reduce((sum, product) => sum + product.subTotal, 0);
  }

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.cd.markForCheck();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  updateTable() {
    if (this._data.length) this.table.renderRows();
  }

  async deleteItem(item: QuotationJobList) {
    const index = this._data.findIndex(
      x => x.materialNumber === item.materialNumber,
    );
    if (index > -1) {
      const origQuantity = this._data[index].quantity;
      const shouldDelete = await this.openDeletionModal();
      this._data[index].quantity = origQuantity;
      if (shouldDelete) {
        this._data.splice(index, 1);
        this.updateTable();
      }
    }
  }

  openDeletionModal(): Promise<boolean> {
    const dialogRef = this.dialog.open(DeletionModalComponent);

    return new Promise<boolean>(resolve => {
      dialogRef.componentInstance.deleteClicked.subscribe(
        (shouldDelete: boolean) => {
          resolve(shouldDelete);
        },
      );
    });
  }
}
