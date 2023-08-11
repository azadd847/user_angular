import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; // AuthService'ın uygun yolunu belirtin

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  users!: any[]; // Kullanıcı verilerini tutacak bir dizi tanımlayın

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // AuthService üzerinden kullanıcı verilerini alın
    const loggedInUser = this.authService.getLoggedInUser();
    // loggedInUser içerisinde kullanıcı verilerine erişebilirsiniz (username, email vb.)
  
    // Örnek olarak sabit bir kullanıcı listesi oluşturuyorum, gerçek verileri burada kullanmalısınız
    this.users = [
      { username: loggedInUser?.username, email: loggedInUser?.email },
      // Diğer kullanıcı verileri buraya eklenir
    ];
  }
  

  editUser(user: any) {
    // Kullanıcı düzenleme işlemleri burada yapılabilir
  }

  deleteUser(user: any) {
    // Kullanıcı silme işlemleri burada yapılabilir
  }
}
