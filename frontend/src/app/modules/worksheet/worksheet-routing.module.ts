import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorksheetComponent } from './components/add-worksheet/add-worksheet.component';

const routes: Routes = [
  { path: '', component: AddWorksheetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetRoutingModule { }
