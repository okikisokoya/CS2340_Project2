import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  name: string ='';
  email: string='';
  feedback: string='';
  message: string='';
// for when you submit the form and generates message
  constructor(private authService: AuthService) {}
  onSubmit() {
    const feedbackData = {
      name: this.name,
      email:this.email,
      feedback: this.feedback
    };
    this.authService.submitFeedback(feedbackData).subscribe(
      (response) => {
        console.log("Feedback submitted successfully:", response);
        this.message = "Feedback submitted successfully!";
        this.resetForm();
      },
      (error) => {
        this.message = 'error:' + (error.error?.error || "Submission failed");
      });
  }
  //resetting the form after you submit the feedback and it is successfully submitted
  resetForm() {
    this.name = '';
    this.email= '';
    this.feedback = '';
  }

}
