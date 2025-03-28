import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service'; // Import ActiveUserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private activeUserService: ActiveUserService
  ) { }

  users: any[] = [];
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data.data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    for (const user of this.users) {
      if (this.username === user.username && this.password === user.password_hash) {
        
        console.log('Login successful! Redirecting...');
        this.activeUserService.setActiveUser(user);
        this.router.navigate(['/profile/profileDetails']);

        return;
      }
    }

    console.log('Login failed. Invalid username or password.');
  }
}
