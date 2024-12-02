
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
    this.http.get(`http://10.91.14.135:8000/api/username-check/?username=${this.username}`).subscribe({
      next: (response: any) => {
        if (response.exists) {
          console.error('Username already exists!');
          alert('This username is already taken. Please choose a different one.');
          return;
        }
  
        // Proceed with form submission if username does not exist
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        };
  
        console.log('Form submitted:', { email: this.email, username: this.username });
  
        this.http.post('http://10.91.14.135:8000/api/signup/', userData, {
          headers: { 'Content-Type': 'application/json' },
          observe: 'response'
        }).subscribe({
          next: (response) => {
            console.log('Full response:', response);
            console.log('Response body:', response.body);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Full error:', error);
            console.error('Error status:', error.status);
            console.error('Error body:', error.error);
  
            // Handle specific error cases
            if (error.status === 400) {
              alert(error.error.error || 'Invalid input');
            } else if (error.status === 500) {
              alert('Server error. Please try again later.');
            }
          }
        });
      },
      error: (error) => {
        console.error('Error checking username:', error);
        alert('Unable to validate username. Please try again later.');
      }
    });
  }
}
