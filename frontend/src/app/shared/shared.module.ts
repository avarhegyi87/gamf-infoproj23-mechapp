import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginModule } from '../modules/login/login.module';
import { HeaderComponent } from './components/header/header.component';
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DeletionModalComponent,
    DynamicTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
  ],
  exports: [HeaderComponent, DeletionModalComponent, DynamicTableComponent],
})
export class SharedModule {}
