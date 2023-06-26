import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WorksheetRoutingModule } from './worksheet-routing.module';

import { AddWorksheetComponent } from './components/add-worksheet/add-worksheet.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EditWorksheetComponent } from './components/edit-worksheet/edit-worksheet.component';
import { WorksheetListComponent } from './components/worksheet-list/worksheet-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { InvoiceComponent } from './components/invoice/invoice.component';

@NgModule({
  declarations: [
    AddWorksheetComponent,
    EditWorksheetComponent,
    WorksheetListComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    WorksheetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
  ],
})
export class WorksheetModule { }
