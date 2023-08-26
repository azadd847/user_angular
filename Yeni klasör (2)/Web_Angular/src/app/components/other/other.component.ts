import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {
  users!: any[];
  loggedInUser: any;
  editingUser: boolean = false;
  editedUser: any = {}; 
  currentCustomerID: string | undefined;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers(); // Call a method to fetch and populate the users array

    const loggedInUser = this.authService.getLoggedInUser();
    this.users = [
      { username: loggedInUser?.username, email: loggedInUser?.email, password: loggedInUser?.password },
    ];
    this.currentCustomerID = loggedInUser?._id; 
  }
  fetchUsers() {
    const jwtToken = this.authService.getAuthToken();
    
    if (jwtToken !== null) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken
      });
  
      this.http.get("http://localhost:8000/user/getAll", { headers }).subscribe(
        (data: any) => {
          this.users = data.data;
        },
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      console.error('JWT token is missing.');
    }
  }
  

  editUser(user: any) {
    this.editingUser = true;
    this.editedUser = { ...user };
    this.currentCustomerID = user._id;
  }

  cancelEditing() {
    this.editingUser = false;
    this.editedUser = {}; 
    this.currentCustomerID = undefined; // Düzenleme iptal edildiğinde currentCustomerID'yi sıfırla
  }

  saveEditedUser() {
    console.log(this.currentCustomerID);
    if (this.currentCustomerID) {
      const requestData = {
        username: this.editedUser.username,
        email: this.editedUser.email,
        password: this.editedUser.password,
      };
  
      // Replace 'your-real-jwt-token' with your actual JWT token
      const jwtToken = 'your-real-jwt-token';
      
      // Set the headers for the PATCH request
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
      
      this.updateResponse(requestData, headers).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Customer Updated");
  
        const index = this.users.findIndex(user => user._id === this.currentCustomerID);
  
        if (index !== -1) {
          this.users[index] = {
            ...this.users[index],
            username: this.editedUser.username,
            email: this.editedUser.email,
            password: this.editedUser.password,
          };
        }
  
        this.cancelEditing();
        this.fetchUsers();
  
      });
    } else {
      // Do nothing if the currentCustomerID is undefined
    }
  }

  // Pass headers as a parameter
  updateResponse(requestData: any, headers: HttpHeaders): Observable<any> {
    return new Observable((observer) => {
      this.http.patch("http://localhost:8000/user/update/" + this.currentCustomerID, requestData, { headers })
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert("Customer Updated");
  
          const index = this.users.findIndex(user => user._id === this.currentCustomerID);
  
          if (index !== -1) {
            this.users[index] = {
              ...this.users[index],
              username: this.editedUser.username,
              email: this.editedUser.email,
              password: this.editedUser.password,
            };
          }
  
          this.cancelEditing();
          this.fetchUsers();
  
          observer.next(resultData);
          observer.complete();
        });
    });
  }
  
  deleteUser(user: any) {
    // Kullanıcı silme işlemleri burada yapılabilir
  }
}
