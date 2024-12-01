import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duo-battle-recap',
  templateUrl: './duo-battle-recap.component.html',
  styleUrls: ['./duo-battle-recap.component.css'],
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  standalone: true,
})

export class DuoBattleRecapComponent {
  user1Name: string = '';
  user2Name: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // You can set these names from your service or route parameters
    this.user1Name = 'Jedi Master'; // Replace with actual user name
    this.user2Name = 'Sith Lord';   // Replace with actual user name
  }

  onNextClick() {
    this.router.navigate(['/duotopartists']); // Navigate to comparison page
  }
}
