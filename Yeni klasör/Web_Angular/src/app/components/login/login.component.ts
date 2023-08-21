import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../other/auth.service'; // AuthService'ın uygun yolunu belirtin

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {} 

  onLogin() {
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    if (this.username && this.password) {
      console.log('Kullanıcı adı:', this.username);
      console.log('Şifre:', this.password);

      const loginData = {
        username: this.username,
        password: this.password
      };

      this.http.post<any>('http://127.0.0.1:8000/login', loginData).subscribe(
        (response) => {
          if (response.status) {
            // Giriş başarılı olduğunda kullanıcı verilerini AuthService ile saklayın
            this.authService.setLoggedInUser(response.user);
            
            this.router.navigate(['/other']);
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.log(error);
          alert('Error during login. Please try again.');
        }
      );
    } else {
      alert('Lütfen kullanıcı adı ve şifre alanlarını doldurun.');
    }
  }

  onSignUp() {
    this.router.navigate(['/signup']); 
  } 
}
