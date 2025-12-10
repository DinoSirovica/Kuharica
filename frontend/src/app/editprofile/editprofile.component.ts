import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit{

  activeUser: any;
  username = "";
  id = 0;
  email = "";
  password = "";
  passwordRepeat = "";
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router,
    private apiService: ApiServiceService
  ) {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleRepeatPasswordVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  ngOnInit(): void {
    this.ActiveUserService.activeUser$.subscribe(user => {
      this.activeUser = user;
      this.id = this.activeUser.user_id;
      this.username=this.activeUser.username;
      this.email=this.activeUser.email;
      // Don't pre-fill password - user should enter new password
      this.password = '';
      this.passwordRepeat = '';
    });
  }

  onSubmit(){
    console.log("Korisničko ime: " + this.username);
    console.log("ID: " + this.id);
    console.log("mail: " + this.email);

    if(this.password != this.passwordRepeat){
      alert("Lozinka i ponovljena lozinka nisu jednake.");
      return;
    }

    // Send plaintext password over HTTPS - server will hash with bcrypt
    this.apiService.updateUserProfile(this.id, this.username, this.password, this.email).subscribe(
      response => {
        this.ActiveUserService.setActiveUser({
          user_id: this.id,
          username: this.username,
          email: this.email
        });
        console.log('User updated successfully');
        alert("Korisnički podatci su uspiješno promijenjeni.");
        this.router.navigate(['/profil']);
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }

}
