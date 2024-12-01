import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duo-songs-intro',
  templateUrl: './duo-songs-intro.component.html',
  styleUrls: ['./duo-songs-intro.component.css'],
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  standalone: true,
})

export class DuoSongsIntroComponent implements OnInit {
  user1Name: string = '';
  user2Name: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Get user names from your service or route parameters
    this.user1Name = 'Jedi Master'; // Replace with actual user name
    this.user2Name = 'Sith Lord';   // Replace with actual user name
  }

  onNextClick() {
    this.router.navigate(['/duotopsongs']); // Navigate to duo songs comparison page
  }
}