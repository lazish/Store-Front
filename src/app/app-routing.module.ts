import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ChartreportComponent } from './chartreport/chartreport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './service/admin.guard';
import { AuthguardGuard } from './service/authguard.guard';
import { SoldComponent } from './sold/sold.component';
import { UpdateComponent } from './update/update.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
  { path: '', component: AuthorizationComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'update', component: UpdateComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'voucher', component: VoucherComponent, canActivate:[AdminGuard]},
  { path: 'sold', component: SoldComponent, canActivate:[AdminGuard]},
  { path: 'chart', component: ChartreportComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
