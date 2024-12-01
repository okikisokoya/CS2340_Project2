import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deleteacc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './deleteacc.component.html',
  styleUrl: './deleteacc.component.css'
})
export class DeleteaccComponent {
  username: string = ''; 
  password: string = ''; 
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
 
  deleteAccount() {
    if (!this.password) {
      this.errorMessage = 'Please enter your password';
      return;
    }

    this.authService.deleteAccount(this.username, this.password).subscribe({
      next: () => {
        alert('Account deleted successfully!');
        this.router.navigate(['/accdeleted']);
      },
      error: (error) => {
        console.error('Delete account error:', error);
        this.errorMessage = error.error?.error || 'Error deleting account';
      }
    });
  }
}
