import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // For making HTTP requests
import { FormsModule } from '@angular/forms';  // For ngModel and two-way data binding
import { routes } from './app.routes';  // Your app's routes
import { provideClientHydration } from '@angular/platform-browser';  // For client-side hydration

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),  // For HTTP requests
    importProvidersFrom(FormsModule),  // For ngModel two-way binding
    provideRouter(routes),  // Set up routing
    provideClientHydration(),  // Enable hydration for browser rendering
  ]
};
