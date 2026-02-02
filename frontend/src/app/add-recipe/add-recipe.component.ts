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
          const img = new Image();
          img.onload = () => {
            const MIN_WIDTH = 400;
            const MIN_HEIGHT = 300;
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 900;

            // Validate minimum dimensions
            if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
              alert(`Slika mora biti minimalno ${MIN_WIDTH}x${MIN_HEIGHT} piksela. Vaša slika je ${img.width}x${img.height}.`);
              (event.target as HTMLInputElement).value = '';
              this.selectedFile = '';
              return;
            }

            // Calculate new dimensions while maintaining aspect ratio
            let newWidth = img.width;
            let newHeight = img.height;

            if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
              const aspectRatio = img.width / img.height;
              if (newWidth > MAX_WIDTH) {
                newWidth = MAX_WIDTH;
                newHeight = Math.round(newWidth / aspectRatio);
              }
              if (newHeight > MAX_HEIGHT) {
                newHeight = MAX_HEIGHT;
                newWidth = Math.round(newHeight * aspectRatio);
              }
            }

            // Create canvas and resize/compress image
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              // Convert to JPEG with 80% quality for good compression
              this.selectedFile = canvas.toDataURL('image/jpeg', 0.8);
            }
          };
          img.src = reader.result as string;
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
