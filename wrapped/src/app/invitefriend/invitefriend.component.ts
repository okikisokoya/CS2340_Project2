import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-invitefriend',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterLink],
  templateUrl: './invitefriend.component.html',
  styleUrl: './invitefriend.component.css'
})
export class InvitefriendComponent {

  constructor(private authService: AuthService, private localStorageService: LocalstorageService, private router: Router) {}

  guestusername = '';
  guestpassword = '';

  generateDuoWrapped() {
    const username = this.localStorageService.getItem('username');
    const password = this.localStorageService.getItem('password');
    if (username && password) {
      this.authService.generateDuoWrap(username, password, this.guestusername, this.guestpassword).subscribe((response) => {
        this.router.navigate(['/duointro']);
      });
    }
  }
}
