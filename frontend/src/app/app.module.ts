import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './modules/login/login.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './modules/users/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    UsersModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
