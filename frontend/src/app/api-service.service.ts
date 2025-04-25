import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';

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

  updateUserProfile(userId:number, username:string, password: string, email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      username: username,
      password_hash: password,
      email: email
    };
    return this.http.put(`${this.baseUrl}/users/${userId}`, body); //http://localhost:8081/api/users
  }

  updateFavourites(userId:number, favourites: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      favourites: favourites,
    };
    console.log('body', body);
    return this.http.put(`${this.baseUrl}/users/${userId}/favourites`, body); //http://localhost:8081/api/users
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/users`, user, { headers });
  }

  getAuthor(userId: number) {
    return this.http.get(`${this.baseUrl}/users/${userId}`); //http://localhost:8081/api/users/:id
  }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`); //http://localhost:8081/api/recipes
  }

  getRecipe(recipeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}`); //http://localhost:8081/api/recipes/:id
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`); //http://localhost:8081/api/categories
  }

  getCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}`); //http://localhost:8081/api/categories/:id
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredients`); //http://localhost:8081/api/ingredients
  }

  getIngredientsbyRecipe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipe-ingredients`); //http://localhost:8081/api/recipe-ingredients
  }

  getImage(imageId: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/images/${imageId}`); //http://localhost:8081/api/images/:imageId
  }

  saveRecipe(
    imageData: ArrayBuffer | string,
    title: string,
    instructions: string,
    user_id: string,
    category_id: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (imageData) {
      return this.http.post(`${this.baseUrl}/images/`, { image_data: imageData }, { headers }).pipe(
        switchMap((response: any) => {
          console.log('Image uploaded successfully:', response);
          const body = {
            title: title,
            instructions: instructions,
            image_id: response.image_id,
            user_id: user_id,
            category_id: category_id
          };
          return this.http.post(`${this.baseUrl}/recipes`, body, { headers });
        })
      );
    } else {
      const body = {
        title: title,
        instructions: instructions,
        user_id: user_id,
        category_id: category_id
      };
      return this.http.post(`${this.baseUrl}/recipes`, body, { headers });
    }
  }

  updateRecipe(
    recipeId:number,
    imageId:number,
    imageData: ArrayBuffer | string,
    title: string,
    instructions: string,
    category_id: string
  )/*: Observable<any>*/ {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (imageData) {
      return this.http.put(`${this.baseUrl}/images/${imageId}`, {image_data: imageData}, {headers}).pipe(
        switchMap((response: any) => {
          const body = {
            title: title,
            instructions: instructions,
            image_id: response.image_id,
            category_id: category_id
          };
          return this.http.put(`${this.baseUrl}/recipes/${recipeId}`, body, {headers});
        })
      );
    } else {
      const body = {
        title: title,
        instructions: instructions,
        category_id: category_id
      };
      return this.http.put(`${this.baseUrl}/recipes/${recipeId}`, body, {headers});
    }
  }

  saveRecipeIngredients(
    recipeId:number, ingredientList:{ id: string, quantity: string }[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      recipe_id: recipeId,
      ingredients: ingredientList
    };
    console.log('body', body);
    return this.http.post(`${this.baseUrl}/recipe-ingredients`, body, { headers });
  }

  deleteRecipeIngredients(
    recipeId:number
  ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.delete(`${this.baseUrl}/recipe-ingredients/${recipeId}`, { headers })
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${recipeId}`); //http://localhost:8081/api/recipes/:id
  }
}

