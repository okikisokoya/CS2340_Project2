import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  
import { LandingComponent } from './landing/landing.component'; 
import { ForgotpassComponent } from './forgotpass/forgotpass.component'; 
import { InvitefriendComponent } from './invitefriend/invitefriend.component';
import { SavedwrapsComponent } from './savedwraps/savedwraps.component';
import { DeleteaccComponent } from './deleteacc/deleteacc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';
import { AccdeletedComponent } from './accdeleted/accdeleted.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';


export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'deleteacc', component: DeleteaccComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'invitefriend', component: InvitefriendComponent },
  { path: 'savedwraps', component: SavedwrapsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loggedout', component: LoggedOutComponent },
  { path: 'accdeleted', component: AccdeletedComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'settings', component: UsersettingsComponent },
];
