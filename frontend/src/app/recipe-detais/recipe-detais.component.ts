import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-recipe-detais',
  templateUrl: './recipe-detais.component.html',
  styleUrl: './recipe-detais.component.css'
})
export class RecipeDetaisComponent implements OnInit {
  activeUser: any;

  recipeId: any;
  recipe: any;

  author: any;
  image: any = "";

  category: any;

  isFavourite: boolean = false;

  constructor(
    private activeUserService: ActiveUserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id)
      if (id !== null) {
        this.recipeId = id;
        this.loadActiveUser();
        this.loadRecipe();
      }
    });
  }

  loadActiveUser(): void {
    this.activeUserService.activeUser$.subscribe(user => {
      this.activeUser = user;
    });
  }

  loadRecipe(): void {
    this.apiService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
      console.log(this.recipe);
      this.loadImage(this.recipe.slika_id);
      this.loadAuthor(this.recipe.korisnik_id);
      this.loadCategory(this.recipe.kategorija_id);
    });
  }

  loadAuthor(userId: any){
    this.apiService.getAuthor(userId).subscribe(data => {
      this.author = data;
    })
  }
  
  loadImage(imageId: any): void {
    this.apiService.getImage(imageId).subscribe(data => {
      this.image=data.image.data;
    })
  }

  loadCategory(categoryId: any): void {
    this.apiService.getCategory(categoryId).subscribe(data => {
      this.category=data;
      console.log(this.category);
    })
  }

  toggleFavourite(): void {
    this.isFavourite = !this.isFavourite;
    // ovdje logika za favorite
  }
}
