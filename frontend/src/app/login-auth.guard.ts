import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  token: any;
  async canActivate() {
    this.token = localStorage.getItem('currentUser');
    if (this.token) {
      await this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
