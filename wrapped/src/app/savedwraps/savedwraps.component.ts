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

    const wrap = this.wraps[index];
    let tracks = wrap.top_tracks;
    let artists = wrap.top_artists;
    let guestTracks = wrap.guest_top_tracks;
    let guestArtists = wrap.guest_top_artists;

    if (wrap.type === 'duo_wrap') {
      // For DuoWrap, include guest tracks and guest artists
      tracks = wrap.user_top_tracks;
      artists = wrap.user_top_artists;
      guestTracks = wrap.guest_top_tracks;
      guestArtists = wrap.guest_top_artists;
    }

    if (username && password) {
      this.authService.setUserParams(username, password, tracks, artists, guestTracks, guestArtists).subscribe((response: any) => {
        if (wrap.type === 'duo_wrap') {
          this.router.navigate(['/duointro']);
        } else {
          this.router.navigate(['/intro']);
        }
      });
    }
  }

  deleteWrap(index: number) {
    //todo implement api on backend
    const wrapId = this.wraps[index].id; // Assuming the wrap has an 'id' field for deletion
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');

    if (username && password && wrapId) {
      this.authService.deleteWrap(username, password, wrapId).subscribe(
        () => {
          // After successful deletion, update the list by removing the deleted wrap
          this.wraps = this.wraps.filter((wrap: any) => wrap.id !== wrapId);
          this.formattedTimestamps = this.formattedTimestamps.filter((_, i) => i !== index); // Remove corresponding timestamp
        },
        (error) => {
          console.error('Error deleting wrap:', error);
        }
      );
    }
  }

}
