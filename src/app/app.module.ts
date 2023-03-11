import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import {TableModule} from 'primeng/table';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import {ChartModule} from 'primeng/chart';




import { AuthInterceptor } from './service/auth.interceptor';
import { VoucherComponent } from './voucher/voucher.component';
import { SoldComponent } from './sold/sold.component';
import { DailogSoldComponent } from './dailog-sold/dailog-sold.component';
import { ChartreportComponent } from './chartreport/chartreport.component';





@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    RegisterComponent,
    UpdateComponent,
    DashboardComponent,
    HeaderComponent,
    AdminComponent,
    VoucherComponent,
    SoldComponent,
    DailogSoldComponent,
    ChartreportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,

    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DynamicDialogModule,
    ChartModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
