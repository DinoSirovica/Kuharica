import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiServiceService} from "../api-service.service";
import {ActiveUserService} from "../active-user.service";

@Component({
  selector: 'app-myfavourites',
  templateUrl: './myfavourites.component.html',
  styleUrl: './myfavourites.component.css'
})
export class MyfavouritesComponent {
  getFavourites: any = [];
  activeUser: any;
  favIds: any = [];

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private activeUserService: ActiveUserService
  ) {}

  ngOnInit(): void {
    this.activeUserService.activeUser$.subscribe(user => {
      this.activeUser = user;
    });

    this.favIds = this.activeUser.favourites.split(',');
    this.apiService.getRecipes().subscribe((response: any) => {
      const recipes = response.data;
      this.getFavourites = recipes.filter((recipe: any) => this.favIds.includes(recipe.recipe_id.toString()));
    });
  }
}
