import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  allRecipes: any = [];
  allUsers: any = [];
  allCategories: any = [];

  searchName: string = '';
  selectedCategory: string = '';
  selectedUser: string = '';

  filteredRecipes: any[] = [];

  constructor(
    private apiService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe(data => {
      this.allRecipes = data.data;
      this.filteredRecipes = data.data;
    })

    this.apiService.getUsers().subscribe(data => {
      this.allUsers = data.data;
    })

    this.apiService.getCategories().subscribe(data => {
      this.allCategories = data;
    })
  }

  searchRecipes(){
    this.filteredRecipes = this.allRecipes;
    if(this.searchName.length > 0){
      this.filteredRecipes = this.allRecipes.filter((recipe: any) => {
        return recipe.title.toLowerCase().trim().includes(this.searchName.toLowerCase().trim());
      });
    }

    if(this.selectedCategory){
      this.filteredRecipes = this.filteredRecipes.filter((recipe: any) => {
        return recipe.category_id == this.selectedCategory;
      });
    }

    if(this.selectedUser.length > 0){
      this.filteredRecipes = this.filteredRecipes.filter((recipe: any) => {
        return recipe.user_id == this.selectedUser;
      });
    }

    this.searchName = '';
    this.selectedCategory = '';
    this.selectedUser = '';
  }

}
