import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-myrecipies',
  templateUrl: './myrecipies.component.html',
  styleUrl: './myrecipies.component.css'
})
export class MyrecipiesComponent implements OnInit{
  userRecipes: any = [];
  activeUser: any ;

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private activeUserService: ActiveUserService
  ) {}

  ngOnInit(): void {
    this.activeUser = this.activeUserService.getActiveUser();
    console.log("Aktivni korisnik:", this.activeUser);

    this.apiService.getRecipes().subscribe((data: any) => {
      console.log("Odgovor API-ja:", data);

      // filtriramo unutar data.data
      this.userRecipes = data.data.filter((recipe: any) =>
        recipe.user_id === this.activeUser.user_id
      );

      console.log("Recepti aktivnog korisnika:", this.userRecipes);
    });
  }


  editRecipe(recipeId: number): void {
    this.router.navigate([`/profil/moji-recepti/uredivanje-recepta`, recipeId]);
  }

  deleteRecipe(recipeId: number){
    this.apiService.deleteRecipe(recipeId).subscribe((response: any) => {
      this.ngOnInit();
    }, (error: any) => {
      console.error("Greška prilikom brisanja recepta:", error);
    });
  }
}
