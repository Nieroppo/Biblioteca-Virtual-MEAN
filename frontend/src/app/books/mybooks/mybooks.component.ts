import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { MyBooksService } from '../service/myBooks.service';
import { Global } from '../../global';
import { HeaderService } from 'src/app/header/service/header.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
  providers: [MyBooksService]
})
export class MybooksComponent implements OnInit {
  public myBooks: Book[];
  public url;
  constructor(private myBooksService: MyBooksService, private headerService: HeaderService) { 
    this.url =Global.url;
    this.myBooks = [];
  }

  ngOnInit(): void {
    this.headerService.show();
    this.getMyBooks();
  }
  getMyBooks() {
    this.myBooksService.myBooks().subscribe(
      response =>{
        if(response.books){
          console.log(response.books);
          this.myBooks= response.books;
        }
      },
      error =>{
        console.log(error);
      }
    )
  }
}
