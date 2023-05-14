import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';

const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'list', component: VehicleListComponent },
  { path: 'add', component: AddVehicleComponent },
  { path: 'edit/:id', component: EditVehicleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule { }
