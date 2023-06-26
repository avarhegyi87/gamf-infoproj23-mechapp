import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorksheetComponent } from './components/add-worksheet/add-worksheet.component';
import { EditWorksheetComponent } from './components/edit-worksheet/edit-worksheet.component';
import { WorksheetListComponent } from './components/worksheet-list/worksheet-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

const routes: Routes = [
  { path: 'add', component: AddWorksheetComponent },
  { path: '', component: WorksheetListComponent },
  { path: 'list', component: WorksheetListComponent },
  { path: 'edit/:id', component: EditWorksheetComponent },
  { path: 'invoice/:id/:paymentMethod', component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetRoutingModule { }
