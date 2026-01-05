import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isPasswordVisible: boolean = false;
  username: string = '';
  password: string = '';
  email: string = '';
  passwordRepeat: string = '';

  constructor(
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (!this.username || !this.email || !this.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.password !== this.passwordRepeat) {
      alert('Passwords do not match.');
      return;
    }

    // Do NOT hash on the client. Send password over HTTPS and let the server hash with bcrypt.
    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.apiService.addUser(newUser).subscribe(
      response => {
        console.log('User added successfully:', response);
        alert('Registracija uspješna! Sada se možete prijaviti.');
        this.router.navigate(['/profil/prijava']);
      },
      error => {
        console.error('Error adding user:', error);
        alert('Registracija nije uspijela');
      }
    );
  }
}
