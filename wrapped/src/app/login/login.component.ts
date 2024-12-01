import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Mark as standalone component
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet], // Import FormsModule here for ngModel binding
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private localStorageService: LocalstorageService) {}

  ngOnInit() {
    console.log('entering login page.');
  }

  login() {
    console.log('calling onLogin()');
    this.localStorageService.setItem('username', this.username);
    this.localStorageService.setItem('password', this.password);

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Redirect to Spotify authorization
        this.authService.spotifyLogin().subscribe((response) => {
        window.open(response.auth_url, "_blank");
        });
      },
      (error) => {
        this.errorMessage = error.error.message || 'Login failed. Please try again.';
      }
    );
  }
}
