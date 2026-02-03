import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

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
    return this.http.get(`${this.baseUrl}/users`);
  }


  login(username: string, hashedPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password: hashedPassword };
    return this.http.post(`${this.baseUrl}/auth/login`, body, { headers });
  }

  loginWithGoogle(credential: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/google`, { credential }, { headers });
  }

  updateUserProfile(userId: number, username: string, password: string, email: string): Observable<any> {
    const body: any = {
      username: username,
      email: email
    };
    if (password) {
      body.password_hash = password;
    }
    return this.http.put(`${this.baseUrl}/users/${userId}`, body);
  }

  updateFavourites(userId: number, favourites: string): Observable<any> {
    const body = {
      favourites: favourites,
    };
    return this.http.put(`${this.baseUrl}/users/${userId}/favourites`, body);
  }

  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/users`, user, { headers });
  }

  getMe(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/me');
  }

  getAuthor(userId: number) {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }

  getRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`);
  }

  getRecipe(recipeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${recipeId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}`);
  }

  getIngredients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredients`);
  }

  getIngredientsbyRecipe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipe-ingredients`);
  }

  getImage(imageId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/images/${imageId}`);
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
    recipeId: number,
    imageId: number,
    imageData: ArrayBuffer | string,
    title: string,
    instructions: string,
    category_id: string
  ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (imageData) {
      return this.http.put(`${this.baseUrl}/images/${imageId}`, { image_data: imageData }, { headers }).pipe(
        switchMap((response: any) => {
          const body = {
            title: title,
            instructions: instructions,
            image_id: response.image_id,
            category_id: category_id
          };
          return this.http.put(`${this.baseUrl}/recipes/${recipeId}`, body, { headers });
        })
      );
    } else {
      const body = {
        title: title,
        instructions: instructions,
        category_id: category_id
      };
      return this.http.put(`${this.baseUrl}/recipes/${recipeId}`, body, { headers });
    }
  }

  saveRecipeIngredients(
    recipeId: number, ingredientList: { id: string, quantity: string }[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      recipe_id: recipeId,
      ingredients: ingredientList
    };
    return this.http.post(`${this.baseUrl}/recipe-ingredients`, body, { headers });
  }

  deleteRecipeIngredients(
    recipeId: number
  ) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.baseUrl}/recipe-ingredients/${recipeId}`, { headers })
  }

  deleteRecipe(recipeId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${recipeId}?user_id=${userId}`);
  }

  getComments(recipeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/${recipeId}`);
  }

  addComment(recipeId: number, userId: number, text: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      recipe_id: recipeId,
      user_id: userId,
      text: text
    };
    return this.http.post(`${this.baseUrl}/comments`, body, { headers });
  }

  updateComment(commentId: number, userId: number, text: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      user_id: userId,
      text: text
    };
    return this.http.put(`${this.baseUrl}/comments/${commentId}`, body, { headers });
  }

  deleteComment(commentId: number, userId: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/comments/${commentId}?user_id=${userId}`);
  }

  blockUser(userId: number, blocked: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { blocked: blocked };
    return this.http.put(`${this.baseUrl}/users/${userId}/block`, body, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }
}
