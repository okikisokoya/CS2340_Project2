import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = 'http://10.91.14.135:8000/api/login/';  // Django login API URL
  private baseUrl = 'http://10.91.14.135:8000';
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

  getTopArtists(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/top-artists/`;
    return this.http.post(url, { username, password });
  }

  setSession(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/set-session/`;
    return this.http.post(url, { username, password });
  }

  generateWrapped(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/generate-wrapped/`;
    return this.http.post(url, { username, password });
  }

  submitFeedback( feedbackData: {name: string, email: string, feedback: string}): Observable<any> {
    const url = `${this.baseUrl}/meet-the-jedis/`;
    return this.http.post(url, feedbackData)
  }

  // honestly i wish i would've just passed in username and password automatically by
  // putting the localstorageservice inside of this service. maybe something to do latr
  getWraps(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/get-wrapped/`;
    return this.http.post(url, { username, password });
  }

  setUserParams(username: string, password: string, tracks: string, artists: string, guestTracks: string, guestArtists: string, popularity: string, guestPopularity: string): Observable<any> {
    const url = `${this.baseUrl}/set-user-params/`;
    return this.http.post(url, { username, password, tracks, artists, guestTracks, guestArtists, popularity, guestPopularity});
  }

  generateDuoWrap(username: string, password: string, guestuser: string, guestpass: string) {
    const url = `${this.baseUrl}/generate-duo-wrapped/`;
    return this.http.post(url, { username, password, guestuser, guestpass});
  }

  getGuestTopSongs(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/guest-top-tracks/`;
    return this.http.post(url, { username, password });
  }

  getGuestTopArtists(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/guest-top-artists/`;
    return this.http.post(url, { username, password });
  }

  deleteWrap(payload: any): Observable<any> {
    const url = `${this.baseUrl}/delete-wrapped/`;
    return this.http.post(url, payload);
  }

  getPopularity(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/user-popularity/`;
    return this.http.post(url, { username, password });
  }
}
