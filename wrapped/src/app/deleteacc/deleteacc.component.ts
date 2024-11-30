import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deleteacc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './deleteacc.component.html',
  styleUrl: './deleteacc.component.css'
})
export class DeleteaccComponent {
  username: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}
 
  onDeleteAccount() {
    this.authService.deleteAccount(this.username).subscribe({
      next: () => alert('Account deleted successfully!'),
      error: (error: any) => {
        console.error('Delete account error:', error);
        alert('Error deleting account.');
      },
    });
  }
}
