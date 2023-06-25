import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksheetRoutingModule } from './worksheet-routing.module';
import { AddWorksheetComponent } from './components/add-worksheet/add-worksheet.component';


@NgModule({
  declarations: [
    AddWorksheetComponent
  ],
  imports: [
    CommonModule,
    WorksheetRoutingModule
  ]
})
export class WorksheetModule { }
