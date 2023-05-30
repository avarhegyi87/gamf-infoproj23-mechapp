import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { AddMaterialComponent } from './components/add-material/add-material.component';
import { EditMaterialComponent } from './components/edit-material/edit-material.component';

const routes: Routes = [
  { path: '', component: MaterialListComponent },
  { path: 'list', component: MaterialListComponent },
  { path: 'add', component: AddMaterialComponent },
  { path: 'edit/:id', component: EditMaterialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule { }
