import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = 'http://localhost:8000'; 

  constructor(public http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/login/`, { username, password });
  }


  // Simple resetPassword method
  resetPassword(username: string, newPassword: string): Observable<any> {
    // Replace 'your-api-endpoint' with your actual backend endpoint
    const endpoint = 'https://your-api-endpoint/reset-password';
    const payload = { username, password: newPassword };

    // Use HTTP POST to send the reset request to your backend
    return this.http.post(endpoint, payload);
  }
}
