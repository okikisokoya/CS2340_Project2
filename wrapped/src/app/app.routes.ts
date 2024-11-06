import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';  // Make sure to import your LoginComponent

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Define the route for the login page
  // Other routes can go here
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Set default route to login page
];
