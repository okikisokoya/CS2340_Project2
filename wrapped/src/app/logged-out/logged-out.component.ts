// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-logged-out',
//   standalone: true,
//   imports: [],
//   templateUrl: './logged-out.component.html',
//   styleUrl: './logged-out.component.css'
// })
// export class LoggedOutComponent {

// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Logic to redirect to login page or handle authentication
    this.router.navigate(['/login']); // Adjust route as necessary
  }
}

