import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuotationComponent } from './components/add-quotation/add-quotation.component';
import { DetailsQuotationComponent } from './components/details-quotation/details-quotation.component';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';
const routes: Routes = [
  { path: '', component: QuotationListComponent },
  { path: 'list', component: QuotationListComponent },
  { path: 'add', component: AddQuotationComponent },
  { path: 'details/:id', component: DetailsQuotationComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationRoutingModule { }
