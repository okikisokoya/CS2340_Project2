import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = 'http://localhost:8000/api/login/';  // Django login API URL
  private baseUrl = 'http://127.0.0.1:8000';
  backendUrl: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("logging in");
    return this.http.post(this.loginUrl, { username, password });
  }

  getTopSongs(): Observable<any> {
    const url = `${this.baseUrl}/top-tracks/`;
    return this.http.get(url);
  }

}
