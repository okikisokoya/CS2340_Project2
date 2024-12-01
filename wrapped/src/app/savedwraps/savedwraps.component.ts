import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-savedwraps',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './savedwraps.component.html',
  styleUrl: './savedwraps.component.css'
})
export class SavedwrapsComponent implements OnInit {
  wraps: any[] = [];
  formattedTimestamps: string[] = []; // New array to store formatted timestamps

  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    if (username && password) {
      this.authService.getWraps(username, password).subscribe((response: any) => {
        this.wraps = response.wraps;

        // Format timestamps and store them
        this.formattedTimestamps = this.wraps.map((wrap: any) => {
          const date = new Date(wrap.created_at);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate()
          ).padStart(2, '0')} : ${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes()
          ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        });
      });
    }
  }

  // Method to handle button clicks
  handleWrapClick(index: number) {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    const tracks = this.wraps[index].top_tracks;
    const artists = this.wraps[index].top_artists;
    if (username && password) {
      this.authService.setUserParams(username, password, tracks, artists).subscribe((response: any) => {
        this.router.navigate(['/intro']);
      });
    }
  }
}
