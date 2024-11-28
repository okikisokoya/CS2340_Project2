import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-top-songs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './top-songs.component.html',
  styleUrl: './top-songs.component.css'
})
export class TopSongsComponent {

}
