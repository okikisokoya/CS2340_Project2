import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-battle-recap',
  templateUrl: './battle-recap.component.html',
  styleUrls: ['./battle-recap.component.css'],
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  standalone: true,
})

export class BattleRecapComponent {
  constructor(private router: Router) {}

  onNextClick() {
    this.router.navigate(['/top-artists']);
  }
}