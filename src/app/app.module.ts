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

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LogInComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthenticationGuard]},
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPopperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
