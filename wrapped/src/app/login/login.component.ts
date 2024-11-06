import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule here

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Mark as standalone component
  imports: [FormsModule]  // Import FormsModule here for ngModel binding
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
