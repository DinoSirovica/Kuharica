import { Component, OnInit, NgZone } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';

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
    private ngZone: NgZone
  ) { }

  users: any[] = [];
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';

  private googleClientId = '674358194368-0areh3ol22h7qpci7hci7aeeoqochotp.apps.googleusercontent.com';
  private googleInitRetryCount = 0;
  private readonly maxGoogleInitRetries = 50; // Max 5 seconds (50 * 100ms)

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

    // Initialize Google Sign-In
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: (response: any) => this.handleGoogleCredentialResponse(response)
      });

      // Check if the DOM element exists before rendering the button
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
      // Retry after a short delay if Google API hasn't loaded yet (with max retries)
      this.googleInitRetryCount++;
      if (this.googleInitRetryCount < this.maxGoogleInitRetries) {
        setTimeout(() => this.initializeGoogleSignIn(), 100);
      } else {
        console.error('Failed to load Google Sign-In API after maximum retries.');
      }
    }
  }

  handleGoogleCredentialResponse(response: any): void {
    // Send the credential token to backend for verification
    const credential = response.credential;

    console.log('Google credential received, sending to backend for verification');

    // Send credential to backend - backend will verify and decode
    this.apiService.googleLogin({ credential }).subscribe(
      (result: any) => {
        console.log('Google login successful:', result);

        // Use NgZone to ensure Angular detects the changes
        this.ngZone.run(() => {
          this.activeUserService.setActiveUser({
            user_id: result.user.user_id,
            username: result.user.username,
            email: result.user.email,
            favourites: result.user.favourites || ''
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
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    for (const user of this.users) {
      if (this.username === user.username && this.password === user.password_hash) {

        console.log('Login successful! Redirecting...');
        this.activeUserService.setActiveUser({
          user_id: user.user_id,
          username: user.username,
          password: user.password_hash,
          email: user.email,
          favourites: (user.favourites == null || false) ? '' : user.favourites
        })
        this.router.navigate(['/profil']);

        console.log('Active user set:',this.activeUserService.getActiveUser())

        return;
      }
    }

    console.log('Login failed. Invalid username or password.');
    alert("Neuspješna prijava! Pogrešna lozinka ili korisničko ime.")
  }
}
