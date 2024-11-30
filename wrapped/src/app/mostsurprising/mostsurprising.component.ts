import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mostsurprising',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mostsurprising.component.html',
  styleUrl: './mostsurprising.component.css'
})
export class MostsurprisingComponent {

}
