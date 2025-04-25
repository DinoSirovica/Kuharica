import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActiveUserService} from '../active-user.service';
import {ApiServiceService} from '../api-service.service';

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
  selectedCategory: any;
  ingredients: any = [];
  ingredientsList: { id: string, quantity: string }[] = [
    {id: '', quantity: ''}
  ];
  selectedFile: string | ArrayBuffer = "";
  recipeProcedure: string = "";

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router,
    private ApiService: ApiServiceService
  ) {
  }

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

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.selectedFile = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addIngredientRow() {
    this.ingredientsList.push({id: '', quantity: ''});
  }

  removeIngredientRow(index: number) {
    if (this.ingredientsList.length > 1) {
      this.ingredientsList.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.recipeName === '' || this.recipeProcedure === '' || this.selectedCategory === null || !this.selectedFile) {
      alert('Molimo vas popunite sva polja!');
      return;
    }
    this.ApiService.saveRecipe(this.selectedFile, this.recipeName, this.recipeProcedure, this.author.user_id, this.selectedCategory)
      .subscribe((response: any) => {
        console.log('Recept uspješno spremljen:', response);
        const recipeId = response.recipe_id;
        this.ApiService.saveRecipeIngredients(recipeId, this.ingredientsList).toPromise();
        alert('Recept uspješno spremljen!');
        this.router.navigate(['/profil']);
      })
    }
  }
