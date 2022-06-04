import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from "./services/auth/auth-guard-service.guard";
import { ApplicationInformationComponent } from './application-information/application-information.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { NgxPopperModule } from 'ngx-popper';
import { LogOutComponent } from './log-out/log-out.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ListComponent } from './list/list.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ScannertestComponent } from './scannertest/scannertest.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import { DataprivacyComponent } from './dataprivacy/dataprivacy.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { BackButtonComponent } from './back-button/back-button.component';
import { WhatDoesApplComponent } from './application-information/what-does-appl/what-does-appl.component';
import { HowCreateListComponent } from './application-information/how-create-list/how-create-list.component';
import { HowShareListComponent } from './application-information/how-share-list/how-share-list.component';



const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LogInComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'home/list', component: ListComponent, canActivate: [AuthenticationGuard] },
  { path: 'home/profile', component: UserSettingsComponent, canActivate: [AuthenticationGuard] },
  { path: 'home/faq', component: ApplicationInformationComponent, canActivate: [AuthenticationGuard] },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'dataprivacy', component: DataprivacyComponent },
  { path: 'home/logout', component: LogOutComponent },
  { path: '', component: LogInComponent },
  { path: 'home/scannertest', component: ScannertestComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationComponent,
    HomeComponent,
    ApplicationInformationComponent,
    UserSettingsComponent,
    LogOutComponent,
    ListComponent,
    ImpressumComponent,
    ScannertestComponent,
    DataprivacyComponent,
    BackButtonComponent,
    WhatDoesApplComponent,
    HowCreateListComponent,
    HowShareListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPopperModule,
    HttpClientModule,
    MatAutocompleteModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
