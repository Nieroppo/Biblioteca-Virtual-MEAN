import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { SaveBookService } from '../services/saveBook.service';
import { UploadCover } from '../services/uploadCover.service';
import { Global } from '../../../global';
import { HeaderService } from 'src/app/header/service/header.service';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css'],
  providers: [SaveBookService, UploadCover]
})
export class SaveBookComponent implements OnInit {
  public titleOfPage: string;
  public book: Book;
  public fileToUpload : Array<File> = [];
  constructor( private _saveBookService: SaveBookService, private _uploadCover : UploadCover , private headerService: HeaderService) {
    this.titleOfPage ="Upload book";
    this.book = new Book("","","","","","","",false,"");
    
   }
   onSubmit(form : any){
    console.log(this.book);  
    this._saveBookService.save(this.book).subscribe(
      respose => {
        this._uploadCover.makeFileRequest(Global.url+"books/uploadCover/"+respose.book._id, [], this.fileToUpload,'image').then(respose =>{
            console.log(respose);
            form.reset();
        }, error =>{
          console.log(error);
        })
      },
      error =>{
        console.log(<any> error);
      }
    )
  }
  fileChangeEvent(fileInput : any){
    this.fileToUpload= <Array<File>>fileInput.target.files;
  }
  ngOnInit(): void {
    this.headerService.show();
  }

}
