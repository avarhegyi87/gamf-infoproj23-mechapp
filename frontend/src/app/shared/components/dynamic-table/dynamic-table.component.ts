import {
  Component,
  Input,
  OnInit,
  DoCheck,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() tableForm!: FormGroup;
  @ViewChild(MatTable) table!: MatTable<any>;

  tableArray!: FormArray;
  prevTableArray!: FormArray;
  dataSource!: MatTableDataSource<AbstractControl>;

  displayedColumns: string[] = ['materialNumber', 'description', 'unit'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.tableArray = this.tableForm.get('tableArray') as FormArray;

    this.dataSource = new MatTableDataSource(
      (this.tableForm.get('tableArray') as FormArray).controls,
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.tableArray = this.tableForm.get('tableArray') as FormArray;
    this.table.renderRows();
  }

  addNewRow() {
    this.tableArray = this.tableForm.get('tableArray') as FormArray;
    this.table.renderRows();
  }
}
