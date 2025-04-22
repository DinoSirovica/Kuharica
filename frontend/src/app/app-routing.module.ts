import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MyfavouritesComponent } from './myfavourites/myfavourites.component';
import { MyrecipiesComponent } from './myrecipies/myrecipies.component';
import { RecipeDetaisComponent } from './recipe-detais/recipe-detais.component';

const routes: Routes = [
  { path: 'profil', component: ProfileComponent },
  { path: 'profil/prijava', component: LoginComponent },
  { path: 'profil/registracija', component: SignupComponent },
  { path: 'profil/uredivanje-profila', component: EditprofileComponent },  
  { path: 'profil/moji-recepti', component: MyrecipiesComponent },
  { path: 'profil/moji-recepti/uredivanje-recepta/:id', component: EditRecipeComponent },
  { path: 'profil/novi-recept', component: AddRecipeComponent },
  { path: 'profil/moji-favoriti', component: MyfavouritesComponent },
  { path: 'recept/detalji/:id', component: RecipeDetaisComponent },
  { path: 'pretrazivanje', component: SearchComponent },
  { path: '', component: HomepageComponent},
  { path: '**', component: PagenotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
