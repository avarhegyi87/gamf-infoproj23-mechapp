import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login/login.component';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginAuthGuard } from './login-auth.guard';
import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        m => m.CustomerModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'material',
    loadChildren: () =>
      import('./modules/material/material.module').then(
        m => m.MaterialModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'vehicle',
    loadChildren: () =>
      import('./modules/vehicle/vehicle.module').then(m => m.VehicleModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'quotation',
    loadChildren: () =>
      import('./modules/quotation/quotation.module').then(m => m.QuotationModule),
      canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
