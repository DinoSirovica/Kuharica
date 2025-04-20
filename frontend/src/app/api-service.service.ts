import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  private baseUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  // recipes	"http://localhost:8081/api/recipes"
  // categories	"http://localhost:8081/api/categories"
  // recipeIngredients	"http://localhost:8081/api/recipe-ingredients"
  // ingredients	"http://localhost:8081/api/ingredients"
  // users	"http://localhost:8081/api/users"
  // images	"http://localhost:8081/api/images"
  
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`); //http://localhost:8081/api/users
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/users`, user, { headers });
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`); //http://localhost:8081/api/categories
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredients`); //http://localhost:8081/api/ingredients
  }
}
