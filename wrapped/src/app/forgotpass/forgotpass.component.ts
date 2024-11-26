import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  resetPassword() {
    // Basic validation: Password must be at least 10 characters and match the confirmation password.
    if (this.password.length < 10) {
      this.errorMessage = 'Password must be at least 10 characters long.';
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
    } else {
      this.errorMessage = '';
      // Call authService to reset the password with username and password as parameters
      this.authService.resetPassword(this.username, this.password).subscribe({
        next: () => alert('Password reset successful!'),
        error: () => alert('Error resetting password.'),
      });
    }
  }
}
