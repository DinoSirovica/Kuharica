import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private activeUserService: ActiveUserService
  ) { }

  activeUser: any;
  username = "";
  email = "";

  ngOnInit(): void {
    this.activeUserService.activeUser$.subscribe(user => {
      if (user) {
        this.activeUser = user;
        this.username = this.activeUser.username;
        this.email = this.activeUser.email;
      }
    });
  }




}
