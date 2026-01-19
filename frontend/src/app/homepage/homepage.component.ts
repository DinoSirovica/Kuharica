import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  getRecepies: any = [];
  getSalads: any = [];
  getSoups: any = [];
  getAppetizers: any = [];
  getMain: any = [];
  getDesserts: any = [];
  getDrinks: any = [];

  constructor(
    private router: Router,
    private ApiService: ApiServiceService,
  ) {}

  ngOnInit(): void {
    this.ApiService.getRecipes().subscribe((response: any) => {
      const recipes = response.data;

      this.getSalads = this.filterByCategory(recipes, 1); // Salata
      this.getSoups = this.filterByCategory(recipes, 2); // Juha
      this.getDrinks = this.filterByCategory(recipes, 3); // Piće
      this.getAppetizers = this.filterByCategory(recipes, 4); // Predjelo
      this.getMain = this.filterByCategory(recipes, 5); // Glavno jelo
      this.getDesserts = this.filterByCategory(recipes, 6); // Desert
    });
  }

  filterByCategory(recipes: any[], categoryId: number): any[] {
    return recipes
      .filter((recipe) => recipe.category_id === categoryId)
      .slice(0, 10);
  }

  swiperConfig = {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    },
    styles: {
      '--swiper-navigation-color': '#f87d02', //mijenja boju swipera
    },
  };
}
