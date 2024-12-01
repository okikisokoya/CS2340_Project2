import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:8000/api/login/';  // Django login API URL
  private baseUrl = 'http://127.0.0.1:8000';
  backendUrl: any;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("logging in");
    return this.http.post(this.loginUrl, { username, password });
  }

  spotifyLogin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/spotifyLogin/`, { withCredentials: true });
  }

  getTopSongs(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/top-tracks/`;
    return this.http.post(url, { username, password });
  }

  setSession(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/set-session/`;
    return this.http.post(url, { username, password });
  }
}
