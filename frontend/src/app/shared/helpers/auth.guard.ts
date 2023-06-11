import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  token: any;

  async canActivate() {
    this.token = localStorage.getItem('currentUser');
    if (!this.token) {
      window.alert("A felkeresett oldal megtekintéséhez nincs jogosultsága! Kérjük jelentkezzen be a használatához!"); (4)
      await this.router.navigate(['login']);
      
      return false;
    } else {
      return true;
    }
  }
    
}
