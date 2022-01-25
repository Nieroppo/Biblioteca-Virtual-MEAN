import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './home/components/home.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { SaveBookComponent } from './books/save-book/components/save-book.component';
import { CreateComponent } from './users/components/create/create.component';
import { PageNotFoundComponent } from './PageNotFound/components/page-not-found.component';
import { LoginComponent } from './users/components/login/login.component';
import { BookComponent } from './books/book/book.component';
import { MybooksComponent } from './books/mybooks/mybooks.component';


const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard]},
    {path: 'book/:id', component: BookComponent, canActivate : [AuthGuard]},
    {path: 'mybooks', component: MybooksComponent, canActivate: [AuthGuard]},
    {path: 'save-book', component: SaveBookComponent},
    {path: 'user/create', component: CreateComponent},
    {path: 'login', component: LoginComponent},
    {path:'**', component: PageNotFoundComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }