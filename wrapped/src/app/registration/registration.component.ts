
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], 
})

export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      console.error('Invalid email format!');
      return;
    }

    if (this.username.length < 10 || this.username.length > 15) {
      console.error('Username must be between 10 and 15 characters!');
      return;
    }

    if (this.password.length < 10 || this.password.length > 15) {
      console.error('Password must be between 10 and 15 characters!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    const userData = {
      email: this.email,
      username: this.username,
      password: this.password,
      confirm_password: this.confirmPassword,
    };

    console.log('Form submitted:', { email: this.email, username: this.username, password: this.password });
    this.http.post('http://127.0.0.1:8080/api/signup/', userData, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response' // This will give you full response details
    }).subscribe({
      next: (response) => {
        console.log('Full response:', response);
        console.log('Response body:', response.body);
        this.router.navigate(['/login']);
      },
    
    });
    }
}
