
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], 
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
