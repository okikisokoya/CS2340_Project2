import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-songs-intro',
  templateUrl: './songs-intro.component.html',
  styleUrls: ['./songs-intro.component.css'],
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  standalone: true,
})

export class SongsIntroComponent {
  constructor(private router: Router) {}

  onNextClick() {
    this.router.navigate(['/top-songs']);
  }
}
