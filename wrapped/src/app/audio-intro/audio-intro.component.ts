
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-intro',
  templateUrl: './audio-intro.component.html',
  styleUrls: ['./audio-intro.component.css'],
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  standalone: true,
})

export class AudioIntroComponent {
  constructor(private router: Router) {}

  onNextClick() {
    this.router.navigate(['/audio']);
  }
}

