import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private baseUrl = 'http://127.0.0.1:8000'; // Replace with your Django backend URL

  constructor(private http: HttpClient) {}

  getTopTracks(): Observable<any> {
    const url = `${this.baseUrl}/api/top-tracks/`;
    return this.http.get(url);
  }

  getTopArtists(): Observable<any> {
    const url = `${this.baseUrl}/api/top-artists/`;
    return this.http.get(url);
  }
}

