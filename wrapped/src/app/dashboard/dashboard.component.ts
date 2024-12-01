
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private localStorageService: LocalstorageService, private router: Router) {}

  ngOnInit() {

  }

  username: string = '<user>'; // Replace or set dynamically based on logged-in user

  generateWrapped(): void {
    console.log('Generate a new Wrapped to help Robby out!');
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    if (username && password) {
      this.authService.generateWrapped(username, password).subscribe((response) => {
        this.router.navigate(['/intro']);
      });
    }
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
