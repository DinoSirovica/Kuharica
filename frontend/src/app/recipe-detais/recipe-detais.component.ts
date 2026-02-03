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

  ingredients: any = [];

  isFavourite: boolean = false;

  constructor(
    private activeUserService: ActiveUserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
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
      this.loadImage(this.recipe.slika_id);
      this.loadAuthor(this.recipe.korisnik_id);
      this.loadCategory(this.recipe.kategorija_id);
      this.loadIngredients(this.recipe.id);

      if (this.activeUser.favourites == null || this.activeUser.favourites == '') {
        this.isFavourite = false;
      }
      else {
        let favs: string = this.activeUser.favourites;
        this.isFavourite = favs.split(',').some((favourite: any) => favourite == this.recipeId);
      }
    });
  }

  loadAuthor(userId: any) {
    this.apiService.getAuthor(userId).subscribe(data => {
      this.author = data;
    })
  }

  loadImage(imageId: any): void {
    this.apiService.getImage(imageId).subscribe(data => {
      this.image = data.image.data;
    })
  }

  loadCategory(categoryId: any): void {
    this.apiService.getCategory(categoryId).subscribe(data => {
      this.category = data;
    })
  }

  loadIngredients(recipeId: any): void {
    this.apiService.getIngredientsbyRecipe().subscribe(recipeData => {
      const allRelations = recipeData.data;

      const filteredRelations = allRelations.filter((rel: any) => rel.recept_id === +recipeId);

      this.apiService.getIngredients().subscribe(ingredientData => {
        const allIngredients = ingredientData.data;

        this.ingredients = filteredRelations.map((rel: any) => {
          const sastojak = allIngredients.find((ing: any) => ing.id === rel.sastojak_id);
          return {
            ime: sastojak ? sastojak.ime : 'Nepoznat',
            kolicina: rel.kolicina
          };
        });
      });
    });
  }


  toggleFavourite(): void {

    if (this.isFavourite) {

      let favs: string = this.activeUser.favourites;
      let favsArray = favs.split(',');
      favsArray = favsArray.filter((favourite: any) => favourite != this.recipeId);
      this.activeUser.favourites = favsArray.join(',');
      if (this.activeUser.favourites == '') {
        this.activeUser.favourites = null;
      }
    } else {

      if (this.activeUser.favourites == null || this.activeUser.favourites == '') {
        this.activeUser.favourites = this.recipeId;
      }
      else {
        this.activeUser.favourites += ',' + this.recipeId;
      }
    }
    this.apiService.updateFavourites(this.activeUser.user_id, this.activeUser.favourites).subscribe(data => {
      this.isFavourite = !this.isFavourite;
    })

  }

  deleteRecipe() {
    if (!this.activeUser) return;

    if (confirm('Jeste li sigurni da želite obrisati ovaj recept?')) {
      this.apiService.deleteRecipe(this.recipeId, this.activeUser.user_id).subscribe({
        next: () => {
          alert('Recept obrisan.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Greška pri brisanju recepta:", err);
          alert('Greška pri brisanju recepta.');
        }
      });
    }
  }

  canDelete(): boolean {
    return this.activeUser && this.recipe && (this.activeUser.role === 'admin' || this.activeUser.user_id === this.recipe.korisnik_id);
  }
}
