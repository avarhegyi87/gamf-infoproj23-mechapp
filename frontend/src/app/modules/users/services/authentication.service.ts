import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}'),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, token: string) {
    return this.http
      .post<any>(`${environment.baseApiUrl}/v1/login`, {
        email,
        token,
      })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}
