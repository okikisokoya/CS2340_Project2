import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deleteacc',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
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
      next: () => {
        alert('Account deleted successfully!');
      },
      error: (error: { error: { error: string; }; }) => {
        this.errorMessage = error.error.error || 'Error deleting account';
        alert(this.errorMessage);
      }
    });
  }
}
