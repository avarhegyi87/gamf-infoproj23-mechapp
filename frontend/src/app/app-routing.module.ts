import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { HomeComponent } from './modules/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        m => m.CustomerModule,
      ),
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('./modules/vehicle/vehicle.module').then(m => m.VehicleModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
