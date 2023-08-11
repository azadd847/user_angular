import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: any; // Giriş yapmış kullanıcının verilerini saklamak için

  constructor(private http: HttpClient) {}

  // AuthServiceda tanımlamanız gereken diğer metotları ekleyin

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  getUserDataByUsername(username: string): Observable<any> {
    // Kullanıcı verilerini çekmek için HTTP isteğini burada gerçekleştirin
    const url = `localhost:4200/users/${username}`; // MongoDB'den veri çekmek için uygun URL'yi belirtin
    return this.http.get(url);
  }
}
