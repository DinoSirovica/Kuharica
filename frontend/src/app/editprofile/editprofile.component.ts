import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit{

  activeUser: any;
  username = "";
  email = "";
  password = "";
  passwordRepeat = "";
  isPasswordVisible: boolean = false;
  isRepeatPasswordVisible: boolean = false;

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router
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

      this.username=this.activeUser.username;
      this.email=this.activeUser.email;
      this.password=this.activeUser.password;
      this.passwordRepeat=this.activeUser.password;
    });
  }

  onSubmit(){
    console.log("Korisničko ime: " + this.username);
    console.log("mail: " + this.email);
    console.log("Lozinka: " + this.password);
    console.log("Ponovljena lozinka: " + this.passwordRepeat);
  }

}
