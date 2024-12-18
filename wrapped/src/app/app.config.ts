import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // For making HTTP requests
import { FormsModule } from '@angular/forms';  // For ngModel and two-way data binding
import { routes } from './app.routes';  // Your app's routes
import { provideClientHydration } from '@angular/platform-browser';  // For client-side hydration

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(FormsModule),  // For ngModel two-way binding
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideClientHydration(),  // Enable hydration for browser rendering
  ]
};
