import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

@Component({
  selector: 'app-accdeleted',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './accdeleted.component.html',
  styleUrl: './accdeleted.component.css'
})
export class AccdeletedComponent {

}
