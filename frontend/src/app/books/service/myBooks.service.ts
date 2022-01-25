import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Global } from '../../global';

@Injectable()
export class MyBooksService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    myBooks() : Observable<any>{
       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'books/myBooks',  {headers: headers});
    }
}