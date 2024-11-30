
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  
import { SpotifyService } from '../services/spotify.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-duominigame',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  templateUrl: './duominigame.component.html',
  styleUrl: './duominigame.component.css'
})
export class DuominigameComponent {

}
