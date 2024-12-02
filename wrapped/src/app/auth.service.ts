import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = 'http://10.91.216.40:8000'; 
  deleteAccountPoint = 'http://10.91.216.40:8000/api/delete-account/';


  constructor(public http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/login/`, { username, password });
  }

  resetPassword(username: string, newPassword: string): Observable<any> {
    const endpoint = 'http://10.91.216.40:8000/api/reset-password/';
    const payload = { username_or_email: username, new_password: newPassword };
  
    return this.http.post(endpoint, payload);
  }
  
  deleteAccount(username: string, password: string): Observable<any> {
    const endpoint = 'http://10.91.216.40:8000/api/delete-account/';
    const payload = {  password: password };
  
    return this.http.post(this.deleteAccountPoint, { 
      username: username, 
      password: password, 
    });
  }

}
