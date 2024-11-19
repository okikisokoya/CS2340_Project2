import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  

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

}
