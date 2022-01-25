import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { Global } from '../../../global';

@Injectable()
export class SaveBookService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    save(book: Book) : Observable<any>{
        let params = JSON.stringify(book);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'books/save', params, {headers: headers});
    }
}