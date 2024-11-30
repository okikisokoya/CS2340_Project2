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
    if (this.password.length < 10) {
      this.errorMessage = 'Password must be at least 10 characters long.';
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
    } else {
      this.errorMessage = '';
      this.authService.resetPassword(this.username, this.password).subscribe({
        next: () => alert('Password reset successful!'),
        error: () => alert('Error resetting password.'),
      });
    }
  }
  validatePassword() {
    if (this.password.length < 10 || this.password.length > 15) {
      this.errorMessage = 'Password must be between 10 and 15 characters.';
    } else if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
    } else {
      this.errorMessage = '';
    }
  }
}
