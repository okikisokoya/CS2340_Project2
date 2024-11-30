import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-great-taste',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './great-taste.component.html',
  styleUrl: './great-taste.component.css'
})
export class GreatTasteComponent {

}