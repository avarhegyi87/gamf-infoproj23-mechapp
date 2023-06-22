import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginModule } from '../modules/login/login.module';
import { HeaderComponent } from './components/header/header.component';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [HeaderComponent, DeletionModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
  ],
  exports: [HeaderComponent, DeletionModalComponent],
})
export class SharedModule {}
