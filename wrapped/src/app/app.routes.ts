import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  
import { LandingComponent } from './landing/landing.component'; 
import { ForgotpassComponent } from './forgotpass/forgotpass.component'; 
import { InvitefriendComponent } from './invitefriend/invitefriend.component';
import { SavedwrapsComponent } from './savedwraps/savedwraps.component';
import { DeleteaccComponent } from './deleteacc/deleteacc.component';


export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'deleteacc', component: DeleteaccComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'invitefriend', component: InvitefriendComponent },
  { path: 'savedwraps', component: SavedwrapsComponent }
];
