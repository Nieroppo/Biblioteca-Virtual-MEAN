import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Global } from '../../global';

@Injectable()
export class AvailableBookService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    showAvailableBooks() : Observable<any>{
       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'books/available',  {headers: headers});
    }
}