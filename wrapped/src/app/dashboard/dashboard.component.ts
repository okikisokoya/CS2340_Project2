// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent {

// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  username: string = '<user>'; // Replace or set dynamically based on logged-in user

  generateWrapped(): void {
    console.log('Generate a new Wrapped to help Robby out!');
    // Add logic to call backend or service to handle generation
  }

  callAlly(): void {
    console.log('Call an Ally for a Wrapped!');
    // Add logic for ally interaction
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      console.log('Account deletion confirmed');
      // Add logic to handle account deletion
    }
  }

  logout(): void {
    console.log('User logged out');
    // Add logic to handle logout
  }
}
