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
  isRepeatPasswordVisible: boolean = false;
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

  toggleRepeatPasswordVisibility(): void {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
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

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.apiService.addUser(newUser).subscribe(
      response => {
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
