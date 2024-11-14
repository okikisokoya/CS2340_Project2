import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports:  [RouterLink, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
