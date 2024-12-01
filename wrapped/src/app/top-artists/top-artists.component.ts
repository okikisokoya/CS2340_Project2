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
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})

export class TopArtistsComponent implements OnInit{
  artists: string[] = [];

  constructor(private authService: AuthService, private localStorageService: LocalstorageService) {}

  ngOnInit() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');

    console.log('Username from storage:', username); 
    console.log('Password from storage:', password);

    if (username && password) {
      

      this.authService.getTopArtists(username, password).subscribe(
        (data) => {
          console.log('API Response:', data); 
          this.artists = data.artists.split(',').map((song: string) => song.trim()); // Assuming the API returns an array of artists
        },
        (error) => {
          console.error('Error fetching top artists:', error);
        }
      );
    }
  }
}
