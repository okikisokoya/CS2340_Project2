// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-usersettings',
//   standalone: true,
//   imports: [],
//   templateUrl: './usersettings.component.html',
//   styleUrl: './usersettings.component.css'
// })
// export class UsersettingsComponent {

// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css'],
})
export class UsersettingsComponent {
  changeEmail() {
    console.log('Navigating to change email address');
    // Add logic to navigate to the email change form or trigger a popup
  }

  changePassword() {
    console.log('Navigating to change password');
    // Add logic to navigate to the password change form or trigger a popup
  }

  deleteAccount() {
    console.log('Initiating account deletion');
    // Add logic to handle account deletion, maybe with a confirmation dialog
  }
}