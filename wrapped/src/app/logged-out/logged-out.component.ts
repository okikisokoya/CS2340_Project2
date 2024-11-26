
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class LoggedOutComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Logic to redirect to login page or handle authentication
    this.router.navigate(['/login']); // Adjust route as necessary
  }
}

