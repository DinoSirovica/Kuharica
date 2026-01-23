import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private activeUserService: ActiveUserService,
    private storageService: StorageService
  ) { }

  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(
      (result: any) => {
        console.log('Login successful! Redirecting...');

        if (result.token) {
          this.storageService.saveToken(result.token);
        }

        this.activeUserService.setActiveUser({
          user_id: result.user.user_id,
          username: result.user.username,
          email: result.user.email,
          favourites: result.user.favourites || '',
          role: result.user.role
        });
        this.router.navigate(['/profil']);
        console.log('Active user set:', this.activeUserService.getActiveUser());
      },
      (error: any) => {
        console.error('Login failed:', error);
        alert("Neuspješna prijava! Pogrešna lozinka ili korisničko ime.");
      }
    );
  }
}
