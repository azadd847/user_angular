// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: any; // Kullanıcı verilerini tutacak değişken

  constructor() {}

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser() {
    if (!this.loggedInUser) {
      const storedUser = localStorage.getItem('loggedInUser');
      this.loggedInUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.loggedInUser;
  }

  clearLoggedInUser() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }
}
