import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-savedwraps',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './savedwraps.component.html',
  styleUrl: './savedwraps.component.css'
})
export class SavedwrapsComponent {

}
