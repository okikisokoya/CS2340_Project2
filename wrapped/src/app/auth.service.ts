import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = 'http://localhost:8000'; 

  constructor(public http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/login/`, { username, password });
  }

  resetPassword(username: string, newPassword: string): Observable<any> {
    const endpoint = 'http://127.0.0.1:8000/api/reset-password/';
    const payload = { username_or_email: username, new_password: newPassword };
  
    return this.http.post(endpoint, payload);
  }
  
  deleteAccount(username: string): Observable<any> {
    const endpoint = 'http://127.0.0.1:8000/api/delete-account/';
    const payload = { username: username };
  
    return this.http.post<any>(endpoint, payload) as Observable<any>;
  }

}
