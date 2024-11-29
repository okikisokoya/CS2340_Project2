import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8000/api/login/';  // Django login API URL
  backendUrl: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("logging in");
    return this.http.post(this.loginUrl, { username, password });
  }
}
