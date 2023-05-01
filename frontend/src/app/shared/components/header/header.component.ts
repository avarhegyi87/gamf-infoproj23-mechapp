/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Role } from 'src/app/modules/users/models/role.model';
import { User } from 'src/app/modules/users/models/user.model';
import { UserService } from 'src/app/modules/users/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  opened = false;
  currentUser: User | undefined;
  userRole: Role;

  constructor(private userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
    this.userRole = this.currentUser?.role || Role.Mechanic;
  }

  ngOnInit(): void {}

  public get accessLevels(): typeof Role {
    return Role;
  }

  canSeeMenuItem(required: Role) {
    return (this.currentUser || environment) && this.userRole >= required;
  }
}
