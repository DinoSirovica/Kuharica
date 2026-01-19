import { Component, OnInit, NgZone } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { StorageService } from '../storage.service';

declare var google: any;

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

  private googleClientId = '856981549467-aol874fo3tae1am4chv4vtrkq1go4p5f.apps.googleusercontent.com';
  private googleInitRetryCount = 0;
  private readonly maxGoogleInitRetries = 50;

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleCredentialResponse(response)
      });

      const googleSignInButton = document.getElementById('google-signin-button');
      if (googleSignInButton) {
        google.accounts.id.renderButton(
          googleSignInButton,
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            width: 300
          }
        );
      } else {
        console.warn('Google Sign-In button element not found in DOM.');
      }
    } else {
      this.googleInitRetryCount++;
      if (this.googleInitRetryCount < this.maxGoogleInitRetries) {
        setTimeout(() => this.initializeGoogleSignIn(), 100);
      } else {
        console.error('Failed to load Google Sign-In API after maximum retries.');
      }
    }
  }

  handleGoogleCredentialResponse(response: any): void {
    const credential = response.credential;

    this.apiService.googleLogin({ credential }).subscribe(
      (result: any) => {
        console.log('Google login successful:', result);

        if (result.token) {
          this.storageService.saveToken(result.token);
        }

        this.ngZone.run(() => {
          this.activeUserService.setActiveUser({
            user_id: result.user.user_id,
            username: result.user.username,
            email: result.user.email,
            favourites: result.user.favourites || '',
            role: result.user.role
          });

          console.log('Active user set:', this.activeUserService.getActiveUser());
          this.router.navigate(['/profil']);
        });
      },
      (error: any) => {
        console.error('Google login error:', error);
        alert('Greška pri prijavi putem Google računa. Pokušajte ponovo.');
      }
    );
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
