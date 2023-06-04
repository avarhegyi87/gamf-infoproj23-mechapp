import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationRoutingModule } from './quotation-routing.module';
import { AddQuotationComponent } from './components/add-quotation/add-quotation.component';
import { EditQuotationComponent } from './components/edit-quotation/edit-quotation.component';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';


@NgModule({
  declarations: [
    AddQuotationComponent,
    EditQuotationComponent,
    QuotationListComponent,
  ],
  imports: [
    CommonModule,
    QuotationRoutingModule,
  ],
})
export class QuotationModule { }
