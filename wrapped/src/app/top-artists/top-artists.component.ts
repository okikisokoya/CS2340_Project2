import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})

export class TopArtistsComponent implements OnInit{
  topArtists: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.fetchTopArtists();
  }

  fetchTopArtists(): void {
    this.spotifyService.getTopArtists().subscribe(
      (data) => {
        this.topArtists = data; // Assuming the API returns an array of artists
      },
      (error) => {
        console.error('Error fetching top artists:', error);
      }
    );
  }
}
