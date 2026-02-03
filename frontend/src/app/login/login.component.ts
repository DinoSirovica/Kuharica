import { Component, OnInit, NgZone } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { StorageService } from '../storage.service';
import { environment } from '../../environments/environment';

declare const google: any;

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
    private storageService: StorageService,
    private ngZone: NgZone
  ) { }

  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: any) => this.handleGoogleSignIn(response),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left'
        }
      );
    } else {
      setTimeout(() => this.initializeGoogleSignIn(), 100);
    }
  }

  handleGoogleSignIn(response: any): void {
    if (response.credential) {
      this.ngZone.run(() => {
        this.apiService.loginWithGoogle(response.credential).subscribe(
          (result: any) => {

            if (result.token) {
              this.storageService.saveToken(result.token);
            }

            this.activeUserService.setActiveUser({
              user_id: result.user.user_id,
              username: result.user.username,
              email: result.user.email,
              favourites: result.user.favourites || '',
              role: result.user.role,
              isGoogleUser: true
            });
            this.router.navigate(['/profil']);
          },
          (error: any) => {
            console.error('Google login failed:', error);
            alert('Neuspješna Google prijava. Pokušajte ponovo.');
          }
        );
      });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(
      (result: any) => {

        if (result.token) {
          this.storageService.saveToken(result.token);
        }

        this.activeUserService.setActiveUser({
          user_id: result.user.user_id,
          username: result.user.username,
          email: result.user.email,
          favourites: result.user.favourites || '',
          role: result.user.role,
          isGoogleUser: false
        });
        this.router.navigate(['/profil']);
      },
      (error: any) => {
        console.error('Login failed:', error);
        alert("Neuspješna prijava! Pogrešna lozinka ili korisničko ime.");
      }
    );
  }
}
