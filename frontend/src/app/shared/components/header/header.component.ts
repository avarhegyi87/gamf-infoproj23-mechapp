/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  opened = false;

  constructor() {}

  ngOnInit(): void {}
}
