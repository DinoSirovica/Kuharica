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

  // Replace with your actual Google Client ID from Google Cloud Console
  private googleClientId = '674358194368-0areh3ol22h7qpci7hci7aeeoqochotp.apps.googleusercontent.com';

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

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 300
        }
      );
    } else {
      // Retry after a short delay if Google API hasn't loaded yet
      setTimeout(() => this.initializeGoogleSignIn(), 100);
    }
  }

  handleGoogleCredentialResponse(response: any): void {
    // Decode the JWT token from Google
    const credential = response.credential;
    const payload = this.decodeJwtToken(credential);

    console.log('Google user info:', payload);

    const googleData = {
      google_id: payload.sub,
      email: payload.email,
      name: payload.name
    };

    // Send to backend for authentication/registration
    this.apiService.googleLogin(googleData).subscribe(
      (result: any) => {
        console.log('Google login successful:', result);

        // Use NgZone to ensure Angular detects the changes
        this.ngZone.run(() => {
          this.activeUserService.setActiveUser({
            user_id: result.user.user_id,
            username: result.user.username,
            password: result.user.password_hash,
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

  decodeJwtToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
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
