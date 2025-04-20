import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../active-user.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent implements OnInit {
  activeUser: any;
  author: any;
  recipeName: string = '';
  categories: any = [];
  selectedCategory: string = '';
  ingredients: any = [];
  selectedIngredient: string = "";
  selectedIngredientTotal: string = "";
  selectedFile: File | null = null;

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router,
    private ApiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.ActiveUserService.activeUser$.subscribe((user) => {
      this.activeUser = user;
      this.author = user;
    });

    this.ApiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.ApiService.getIngredients().subscribe((data: any) => {
      this.ingredients = data.data;
    })
  }

  onSubmit (){

  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log("Odabrana datoteka:", this.selectedFile);
    }
  }
}
