import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  addEmpURL: string;
  getEmpURL: string;
  updateEmpUrl: string;
  
  constructor(private http: HttpClient) {
    this.addEmpURL = "http://localhost:8000/emp/saveForm";
    this.getEmpURL = "http://localhost:8000/emp/getAll";
    this.updateEmpUrl = 'http://localhost:8000/emp/updateEmployee';
  }
  
  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL, emp);
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  updateEmployee(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.updateEmpUrl, emp);
  }
  
}
