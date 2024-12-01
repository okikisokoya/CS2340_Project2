import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-duototalpoints',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './duototalpoints.component.html',
  styleUrl: './duototalpoints.component.css'
})
export class DuototalpointsComponent implements OnInit {
  popularity: number = 0;
  guestPopularity: number = 0;
  resultMessage: string = ''; // Message for the result (e.g., who wins)

  constructor(private authService: AuthService, private localStorageService: LocalstorageService) {}

  ngOnInit() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');

    if (username && password) {
      this.authService.getPopularity(username, password).subscribe(
        (data) => {
          this.popularity = data.popularity;
          this.guestPopularity = data.guest_popularity;

          // Determine the result message
          if (this.popularity > this.guestPopularity) {
            this.resultMessage = 'Jedi Win!';
          } else if (this.popularity < this.guestPopularity) {
            this.resultMessage = 'Siths Win!';
          } else {
            this.resultMessage = 'It\'s a Draw!';
          }
        },
        (error) => {
          console.error('Error fetching top artists:', error);
        }
      );
    }
  }
}
