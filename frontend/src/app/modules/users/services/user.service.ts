import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${environment.baseApiUrl}/api/users`);
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }
}
