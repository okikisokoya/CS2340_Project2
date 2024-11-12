import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  
import { LandingComponent } from './landing/landing.component'; 

export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'login', component: LoginComponent },  // Define the route for the login page
  //{ path: '', redirectTo: '/landing', pathMatch: 'full' },  // Set default route to landing page
];
