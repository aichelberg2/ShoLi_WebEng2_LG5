import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import {LogInComponent} from './log-in/log-in.component';
import {RegistrationComponent} from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {AuthenticationGuard} from "./services/auth/auth-guard-service.guard";
import { SettingsComponent } from './settings/settings.component';
import { ApplicationInformationComponent } from './application-information/application-information.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {NgxPopperModule} from 'ngx-popper';
import { LogOutComponent } from './log-out/log-out.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LogInComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthenticationGuard]},
  {path: 'home/settings', component: SettingsComponent, canActivate:[AuthenticationGuard]},
  {path: 'home/profile', component: UserSettingsComponent, canActivate:[AuthenticationGuard]},
  {path: 'home/faq', component: ApplicationInformationComponent, canActivate:[AuthenticationGuard]},
  {path: 'home/logout', component: LogOutComponent, canActivate:[AuthenticationGuard]},
  {path: '', component: LogInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegistrationComponent,
    HomeComponent,
    SettingsComponent,
    ApplicationInformationComponent,
    UserSettingsComponent,
    LogOutComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPopperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
