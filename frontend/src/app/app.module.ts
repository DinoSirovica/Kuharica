import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthInterceptor } from './auth.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MyrecipiesComponent } from './myrecipies/myrecipies.component';
import { MyfavouritesComponent } from './myfavourites/myfavourites.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetaisComponent } from './recipe-detais/recipe-detais.component';
import { CommentsComponent } from './comments/comments.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'profil', component: ProfileComponent },
  { path: 'profil/prijava', component: LoginComponent },
  { path: 'profil/registracija', component: SignupComponent },
  { path: 'profil/uredivanje-profila', component: EditprofileComponent },
  { path: 'profil/moji-recepti', component: MyrecipiesComponent },
  { path: 'profil/moji-recepti/uredivanje-recepta', component: EditRecipeComponent },
  { path: 'profil/novi-recept', component: AddRecipeComponent },
  { path: 'profil/moji-favoriti', component: MyfavouritesComponent },
  { path: 'recept/detalji', component: RecipeDetaisComponent },
  { path: 'pretrazivanje', component: SearchComponent },
  { path: '', component: HomepageComponent },
  { path: '**', component: PagenotfoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    HomepageComponent,
    ProfileComponent,
    SearchComponent,
    EditprofileComponent,
    MyrecipiesComponent,
    EditRecipeComponent,
    AddRecipeComponent,
    RecipeDetaisComponent,
    MyfavouritesComponent,
    MyfavouritesComponent,
    CommentsComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
