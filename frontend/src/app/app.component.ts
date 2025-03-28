import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from './active-user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'frontend';
  activeUser: any;

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router
  ){};

  logoutUser(){
    this.ActiveUserService.clearActiveUser();
    console.log("Log out");
    this.router.navigate(['/']);
  }
}
