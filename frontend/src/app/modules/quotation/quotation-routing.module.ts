import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuotationComponent } from './components/add-quotation/add-quotation.component';
import { EditQuotationComponent } from './components/edit-quotation/edit-quotation.component';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';
const routes: Routes = [
  { path: '', component: QuotationListComponent },
  { path: 'list', component: QuotationListComponent },
  { path: 'add', component: AddQuotationComponent },
  { path: 'edit/:id', component: QuotationListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationRoutingModule { }