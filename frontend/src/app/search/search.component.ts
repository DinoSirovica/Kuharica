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
      console.log(this.allCategories);
    })
  }

  searchRecipes(){

  }

}
