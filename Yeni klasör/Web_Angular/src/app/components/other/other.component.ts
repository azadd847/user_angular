import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
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
    const loggedInUser = this.authService.getLoggedInUser();
    this.users = [
      { username: loggedInUser?.username, email: loggedInUser?.email, password: loggedInUser?.password },
    ];
    this.currentCustomerID = loggedInUser?._id; 
  }


  






  editUser(user: any) {
    this.editingUser = true;
    this.editedUser = { ...user }; 
    this.currentCustomerID = user._id; // currentCustomerID'yi ayarla
  }

  cancelEditing() {
    this.editingUser = false;
    this.editedUser = {}; 
    this.currentCustomerID = undefined; // Düzenleme iptal edildiğinde currentCustomerID'yi sıfırla
  }

  saveEditedUser() {
    console.log('Save edited user:', this.editedUser);

    if (this.currentCustomerID) {
      // Define the requestData variable with the properties you want to update
      const requestData = {
        username: this.editedUser.username,
        email: this.editedUser.email,
        password: this.editedUser.password,
      };

      // Subscribe to the updateResponse method to get the result of the patch request
      this.updateResponse(requestData).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Customer Updated");
        // this.getAllCustomer(); // Call your method to fetch updated data if needed
        this.cancelEditing();
      });
    } else {
      console.error('currentCustomerID is undefined. Cannot send the PATCH request.');
    }
  }

  // Make the updateResponse method asynchronous and return an observable
  // Pass the requestData variable as a parameter
  updateResponse(requestData: any): Observable<any> {
    return new Observable((observer) => {
      this.http.patch("http://localhost:8000/user/update/" + this.currentCustomerID, requestData)
        .subscribe((resultData: any) => {
          observer.next(resultData);
          observer.complete();
        });
    });
  }

  // Define your getAllCustomer method here
  // ...

  deleteUser(user: any) {
    // Kullanıcı silme işlemleri burada yapılabilir
  }
}
