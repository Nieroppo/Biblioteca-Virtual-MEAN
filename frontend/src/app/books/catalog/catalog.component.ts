import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { AvailableBookService } from '../service/AvailableBook.service'; 
import { Global } from '../../global';
import { HeaderService } from 'src/app/header/service/header.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [AvailableBookService]
})


export class CatalogComponent implements OnInit {
  public catalog: Book[];
  public url;
  constructor(private bookService : AvailableBookService, private headerService : HeaderService) { 
    this.catalog = [];
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.headerService.show();
    this.getBook();
    
  }
  getBook(){
    this.bookService.showAvailableBooks().subscribe(
      response => {
        if(response.books){
          console.log(response.books);
          this.catalog = response.books;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
