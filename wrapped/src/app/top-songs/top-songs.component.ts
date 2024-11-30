import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-top-songs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './top-songs.component.html',
  styleUrl: './top-songs.component.css'
})
export class TopSongsComponent implements OnInit {
  songs: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getTopSongs().subscribe(
      (data) => {
        this.songs = data; // Assuming the API returns an array of artists
      },
      (error) => {
        console.error('Error fetching top artists:', error);
      }
    );
  }

}
