// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css'
// })
// export class RegistrationComponent {

// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    if (this.password === this.confirmPassword) {
      console.log('Form submitted:', { username: this.username, password: this.password });
      // Add logic for account creation here
    } else {
      console.error('Passwords do not match!');
    }
  }
}

