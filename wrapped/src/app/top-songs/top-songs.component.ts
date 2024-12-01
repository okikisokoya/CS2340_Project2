import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-top-songs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './top-songs.component.html',
  styleUrl: './top-songs.component.css'
})
export class TopSongsComponent implements OnInit {
  songs: string[] = [];

  constructor(private authService: AuthService, private localStorageService: LocalstorageService) {}

  ngOnInit() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    
    if (username && password) {
      this.authService.getTopSongs(username, password).subscribe(
        (data) => {
          this.songs = data.tracks.split(',').map((song: string) => song.trim()); // Assuming the API returns an array of artists
        },
        (error) => {
          console.error('Error fetching top artists:', error);
        }
      );
    }
  }

}
