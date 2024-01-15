import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { CompanyComponent } from './company/company.component';
import { BuildingTypeComponent } from './building-type/building-type.component';
import { ProfitComponent } from './profit/profit.component';
import { CurrencyComponent } from './currency/currency.component';
import { MethodOfCalcComponent } from './method-of-calc/method-of-calc.component';
import { PriceTypeComponent } from './price-type/price-type.component';
import { UnitComponent } from './unit/unit.component';
import { UnitOrientationComponent } from './unit/unit-orientation/unit-orientation.component';
import { UnitFixtureComponent } from './unit/unit-fixture/unit-fixture.component';
import { UnitViewComponent } from './unit/unit-view/unit-view.component';
import { UnitStatusComponent } from './unit/unit-status/unit-status.component';
import { UnitFloorComponent } from './unit/unit-floor/unit-floor.component';
import { UnitOfMeasureComponent } from './unit/unit-of-measure/unit-of-measure.component';
import { UsageTypeComponent } from './unit/usage-type/usage-type.component';
import { UnitSubTypeComponent } from './unit/unit-sub-type/unit-sub-type.component';
import { BuildingComponent } from './building/building.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAreaComponent } from './project/project-area/project-area.component';
import { BuildingAreaComponent } from './building/building-area/building-area.component';
import { UnitAreaComponent } from './unit/unit-area/unit-area.component';
import { AreaComponent } from './area/area.component';
import { PaymentComponent } from './payment/payment.component';
import { ModelComponent } from './model/model.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  
  { path: 'city', canActivate: [AuthGuard],component: CityComponent },
  { path: 'company', canActivate: [AuthGuard],component: CompanyComponent },
  { path: '', component: AuthComponent },
  { path: 'about', component: AboutComponent },
  { path: 'payment', canActivate: [AuthGuard],component: PaymentComponent },
  { path: 'area', canActivate: [AuthGuard],component: AreaComponent },
  { path: 'building', canActivate: [AuthGuard],component: BuildingComponent },
  { path: 'building-type', canActivate: [AuthGuard],component: BuildingTypeComponent },
  { path: 'building-area', canActivate: [AuthGuard],component: BuildingAreaComponent },
  { path: 'project', canActivate: [AuthGuard],component: ProjectComponent },
  { path: 'project-area',canActivate: [AuthGuard], component: ProjectAreaComponent },
  { path: 'profit', canActivate: [AuthGuard],component: ProfitComponent },
  { path: 'currency', canActivate: [AuthGuard],component: CurrencyComponent },
  { path: 'moc', canActivate: [AuthGuard],component: MethodOfCalcComponent },
  { path: 'price-type', canActivate: [AuthGuard],component: PriceTypeComponent },
  { path: 'unit',canActivate: [AuthGuard], component: UnitComponent },
  { path: 'unit-view',canActivate: [AuthGuard], component: UnitViewComponent },
  { path: 'unit-status',canActivate: [AuthGuard], component: UnitStatusComponent },
  { path: 'unit-floor', canActivate: [AuthGuard],component: UnitFloorComponent },
  { path: 'uom', canActivate: [AuthGuard],component: UnitOfMeasureComponent },
  { path: 'unit-usagetype',canActivate: [AuthGuard], component: UsageTypeComponent },
  { path: 'unit-subtype',canActivate: [AuthGuard], component: UnitSubTypeComponent },
  { path: 'unit-orientation', canActivate: [AuthGuard],component: UnitOrientationComponent },
  { path: 'unit-fixture',canActivate: [AuthGuard], component: UnitFixtureComponent },
  { path: 'unit-area', canActivate: [AuthGuard],component: UnitAreaComponent },
  { path: 'home', canActivate: [AuthGuard],component: ModelComponent },
  //{ path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
