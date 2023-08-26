import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  setLoggedInUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser() {
    const storedUser = localStorage.getItem('loggedInUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  clearLoggedInUser() {
    localStorage.removeItem('loggedInUser');
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }
}
