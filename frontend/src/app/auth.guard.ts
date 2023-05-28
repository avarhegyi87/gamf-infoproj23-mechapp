import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router:Router){

    }
    token: any;
    canActivate(){
        this.token = localStorage.getItem('currentUser');
        if (this.token){
            this.router.navigate(['']);
            return false;
            
        }
        else{
            return true;
        }
    }
}

