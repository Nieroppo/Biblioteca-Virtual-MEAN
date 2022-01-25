import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';


import { AppComponent } from './app.component';
import { CatalogComponent } from './books/catalog/catalog.component';
import { HomeComponent } from './home/components/home.component';
import { PageNotFoundComponent } from './PageNotFound/components/page-not-found.component';
import { HeaderComponent } from './header/components/header.component';
import { FooterComponent } from './footer/components/footer.component';
import { SaveBookComponent } from './books/save-book/components/save-book.component';
import { LoginComponent } from './users/components/login/login.component';
import { CreateComponent } from './users/components/create/create.component';
import { TokenInterceptorService } from './users/service/token-interceptor.service';
import { BookComponent } from './books/book/book.component';
import { MybooksComponent } from './books/mybooks/mybooks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateComponent,
    CatalogComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,  
    SaveBookComponent, BookComponent, MybooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ AuthGuard, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
