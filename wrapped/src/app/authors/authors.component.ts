import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

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

  // Method to handle form submission
  onSubmit() {
    const feedbackData = {
      name: this.name,
      email: this.email,
      feedback: this.feedback
    };

    // Call submitFeedback method of AuthService
    this.authService.submitFeedback(feedbackData).subscribe(
      (response) => {
        console.log("Feedback submitted successfully:", response);
        this.message = "Feedback submitted successfully!";  // Success message
        this.resetForm();  // Reset the form after successful submission
      },
      (error) => {
        console.error("Error submitting feedback:", error);
        this.message = 'Error: ' + (error.error?.error || "Submission failed");  // Error message
      }
    );
  }
  //resetting the form after you submit the feedback and it is successfully submitted
  resetForm() {
    console.log("Resetting form");
    this.name = '';
    this.email= '';
    this.feedback = '';
    this.message = '';
  }

}
