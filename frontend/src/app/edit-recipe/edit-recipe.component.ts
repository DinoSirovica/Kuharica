import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  activeUser: any;
  recipeId!: number;
  recipe: any = {};
  ingredientsList: { id: string, quantity: string }[] = [];
  selectedFile: string | ArrayBuffer = "";

  ingredients: any[] = [];
  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private activeUserService: ActiveUserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activeUser = this.activeUserService.getActiveUser();
    this.recipeId = +this.route.snapshot.paramMap.get('id')!;

    this.apiService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
    });

    this.loadIngredients(this.recipeId);

    this.apiService.getIngredients().subscribe(data => {
      this.ingredients = data.data;
    });

    this.apiService.getCategories().subscribe(data => {
      this.categories=data;
    })
  }

  loadIngredients(recipeId: number): void {
    this.apiService.getIngredientsbyRecipe().subscribe(recipeData => {
      const allRelations = recipeData.data;

      const filteredRelations = allRelations.filter((rel: any) => rel.recept_id === +recipeId);

      this.apiService.getIngredients().subscribe(ingredientData => {
        const allIngredients = ingredientData.data;

        this.ingredients = allIngredients; // za <select> i getNameById()

        this.ingredientsList = filteredRelations.map((rel: any) => ({
          id: rel.sastojak_id,
          quantity: rel.kolicina
        }));
      });
    });
  }

  getIngredientNameById(id: number): string | null {
    const found = this.ingredients.find(ing => ing.id === id);
    return found ? found.ime : null;
  }

  addIngredientRow() {
    this.ingredientsList.push({ id: "0", quantity: '' });
  }

  removeIngredientRow(index: number) {
    this.ingredientsList.splice(index, 1);
  }

  onSubmit() {
    console.log('onSubmit', this, this.recipe);

    this.apiService.updateRecipe(this.recipeId, this.recipe.slika_id, this.selectedFile, this.recipe.naslov, this.recipe.upute, this.recipe.kategorija_id)
      .subscribe((response: any) => {
        console.log('Recept uspješno ažuriran:', response);
        const recipeId = response.recipe_id;

        // First delete ingredients, then save new ones
        this.apiService.deleteRecipeIngredients(recipeId).subscribe(() => {
          this.apiService.saveRecipeIngredients(recipeId, this.ingredientsList).subscribe(() => {
            alert('Recept uspješno ažuriran!');
            this.router.navigate(['/profil/moji-recepti']);
          });
        });
      });
  }

  onFileSelected(event: any) {
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
}
