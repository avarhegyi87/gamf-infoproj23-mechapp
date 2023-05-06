import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({providedIn: 'root'})
export class CustomerService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + 'customer/getall');
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseApiUrl + 'customer/get/' + id);
  }

  addCustomer(addCustomerRequest: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseApiUrl + 'customer/create', addCustomerRequest);
  }

  updateCustomer(id: string, updateCustomerRequest: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseApiUrl + 'customer/put/' + id, updateCustomerRequest);
  }

  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(this.baseApiUrl + 'delete/' + id);
  }
}
