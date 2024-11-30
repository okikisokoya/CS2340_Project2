import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';  
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-top-artists',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
