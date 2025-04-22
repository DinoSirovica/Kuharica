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
  selectedCategory: any;
  ingredients: any = [];
  ingredientsList: { id: string, quantity: string }[] = [
    { id: '', quantity: '' }
  ];
  selectedFile: string | ArrayBuffer = "";
  recipeProcedure: string = "";

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
    this.ingredientsList.push({ id: '', quantity: '' });
  }
  
  removeIngredientRow(index: number) {
    if (this.ingredientsList.length > 1) {
      this.ingredientsList.splice(index, 1);
    }
  }

  onSubmit (){
      console.log("🔸 Novi recept:");
      console.log("Naziv recepta:", this.recipeName);
    
      // Ispis kategorije
      console.log("Kategorija: " + this.selectedCategory);
    
      // Ispis sastojaka
      console.log("Sastojci:");
      this.ingredientsList.forEach((item, index) => {
        const ingredientObj = this.ingredients.find((ing: any) => ing.id === item.id);
        console.log(`  ${index + 1}. (ID: ${item.id}) - količina: ${item.quantity}`);
      });
      
    
      // Ispis slike
      console.log("Fotografija:", this.selectedFile ? this.selectedFile : "Nije odabrana");
    
      // Ispis postupka
      console.log("Postupak:", this.recipeProcedure);
    
  }
}
