import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { Global } from '../../global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GetBookService } from '../service/getBook.service';
import { TakeBookService } from '../service/takeBook.service';
import { TakeBackService } from '../service/takeBack.service';
import { HeaderService } from 'src/app/header/service/header.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [GetBookService, TakeBookService, TakeBackService]
})
export class BookComponent implements OnInit {
  public book: Book;
  public url: string;
  constructor(
    private getBookService : GetBookService,
    private takeBookService : TakeBookService,
    private takeBackService : TakeBackService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private headerService : HeaderService
  ) { 
    this.book = new Book("","","","","","","",false,"");
    this.url = Global.url; 
  }

  ngOnInit(): void {
    this.headerService.show();
    this.activatedRoute.params.subscribe( params => {
      const id = params['id'];
      this.getBook(id);
    })
  }
  getBook(id: string){
    this.getBookService.getBook(id).subscribe(
      response=>{
        this.book = response.book;
      },
      error =>{
        console.log(error);
      }
    )
  }
  takeBook(id: string){
    this.takeBookService.takeBook(id).subscribe(
      response=>{
        this.book.borrowed=true;
      },
      error =>{
        console.log(error);
      }
    )
  }
  takeBack(id : string){
    this.takeBackService.takeBack(id).subscribe(
      response=>{
        this.book.borrowed = false;        
      },
      error =>{
        console.log(error);
      }
    )
  }
}
