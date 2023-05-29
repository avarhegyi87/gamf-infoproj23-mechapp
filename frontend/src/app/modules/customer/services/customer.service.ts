import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({providedIn: 'root'})
export class CustomerService {
  baseApiUrl: string = environment.baseApiUrl;
  entityName = '/customer';
  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseApiUrl + this.entityName + '/getAll');
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseApiUrl + this.entityName + '/get/' + id);
  }

  addCustomer(addCustomerRequest: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseApiUrl + this.entityName + '/create', addCustomerRequest);
  }

  updateCustomer(id: number, updateCustomerRequest: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.baseApiUrl + this.entityName + '/put/' + id, updateCustomerRequest);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(this.baseApiUrl + this.entityName + '/delete/' + id);
  }
}
